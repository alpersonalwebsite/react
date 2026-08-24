#!/usr/bin/env node
/**
 * Check the links and images in these notes.
 *
 * TWO MODES, split by what makes a link rot.
 *
 * Default, safe on every push, answered entirely from the files on disk:
 *   - a relative link or image resolves to a file that exists,
 *   - an anchor names a heading that exists, by GitHub's slug rules,
 *   - a link with no scheme that looks like a hostname is reported, because
 *     GitHub resolves it as a path inside the repository and it 404s.
 *
 * `--external`, for the scheduled run: every http(s) URL.
 *
 * WHY THE SPLIT. An external link rots as a function of ELAPSED TIME rather than
 * of commits. This repository went from 2020 to 2026 with almost no changes, so a
 * push-triggered external check would have run on the days it happened to be
 * edited and never in between. A monthly job is what finds a dead MDN page.
 *
 * 403 and 429 are reported as UNCHECKED rather than broken: they mean a server
 * declined to answer, which is not the same as a missing page, and failing on
 * them teaches people to ignore this check.
 *
 * HEAD FIRST, THEN GET ON ANY UNSUCCESSFUL STATUS, not only on 405. An earlier
 * version of this script in a sibling repository retried only for 405, on the
 * reasoning that other codes are real answers. Measured counter-example there:
 * hackerrank.com answers 500 to HEAD and 200 to GET. A server that dislikes HEAD
 * does not have to say 405 about it.
 */

import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const external = process.argv.includes('--external')
const files = execFileSync('git', ['-C', repo, 'ls-files', '*.md'], { encoding: 'utf8' })
  .split('\n').filter(Boolean).sort()

/** GitHub's heading slug: trimmed ONCE up front, punctuation dropped, spaces to hyphens. */
const slug = (heading) =>
  heading.trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s/g, '-')

const headings = new Map()
for (const file of files) {
  const found = new Set()
  let inFence = false
  for (const line of readFileSync(join(repo, file), 'utf8').split('\n')) {
    if (/^```/.test(line)) { inFence = !inFence; continue }
    if (inFence) continue
    const m = /^#{1,6}\s+(.*?)\s*$/.exec(line)
    if (m) found.add(slug(m[1]))
  }
  headings.set(file, found)
}

const failures = []
const unchecked = []
let localLinks = 0
let images = 0
let anchors = 0
const remote = []

for (const file of files) {
  const text = readFileSync(join(repo, file), 'utf8')
  // Two destination forms. CommonMark allows `(<...>)`, which is how you write a
  // URL containing parentheses, and this repository has one:
  // `[Stack](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>)`.
  // Reading only the bare form truncates it at the first `)` and reports a live
  // link as dead, which is measurably what the first version of this script did.
  for (const m of text.matchAll(/(!?)\[[^\]]*\]\((?:<([^>]+)>|([^)\s]+))\)/g)) {
    const isImage = m[1] === '!'
    const target = m[2] ?? m[3]

    if (/^https?:\/\//i.test(target)) {
      remote.push({ file, target })
      continue
    }
    if (/^(mailto|tel):/i.test(target)) continue
    if (/^[\w.-]+\.(com|org|net|io|dev|biz|info)(\/|$)/i.test(target)) {
      failures.push(`${file}: \`${target}\` has no scheme, so it resolves as a path inside this repository`)
      continue
    }

    const [path, anchor] = target.split('#')
    let inFile = file
    if (path !== '') {
      if (isImage) images++
      else localLinks++
      inFile = normalize(join(dirname(file), decodeURIComponent(path)))
      if (!existsSync(join(repo, inFile))) {
        failures.push(`${file}: ${isImage ? 'image' : 'link'} \`${target}\`, but ${inFile} does not exist`)
        continue
      }
    }
    if (anchor) {
      anchors++
      const known = headings.get(inFile)
      if (!known) {
        failures.push(`${file}: anchor \`#${anchor}\` into ${inFile}, which this script did not read`)
      } else if (!known.has(anchor)) {
        failures.push(`${file}: \`${target}\`, but ${inFile} has no heading slugging to \`${anchor}\``)
      }
    }
  }
}

console.log(
  `${files.length} notes files: ${localLinks} relative link(s), ${images} image(s), ${anchors} anchor(s), ` +
    `${remote.length} external URL(s) ${external ? 'to check' : 'not checked'}`,
)

if (external) {
  const UNCHECKABLE = new Set([403, 429])
  const seen = new Map()
  let reachable = 0
  for (const { file, target } of remote) {
    if (seen.has(target)) continue
    seen.set(target, true)
    let status = 0
    try {
      const head = execFileSync('curl', ['-s', '-o', '/dev/null', '-w', '%{http_code}', '-I',
        '--max-time', '25', '-L', target], { encoding: 'utf8' })
      status = Number(head.trim())
      if (!(status >= 200 && status < 400)) {
        const get = execFileSync('curl', ['-s', '-o', '/dev/null', '-w', '%{http_code}',
          '--max-time', '25', '-L', target], { encoding: 'utf8' })
        status = Number(get.trim())
      }
    } catch {
      status = 0
    }
    if (status >= 200 && status < 400) { reachable++; continue }
    if (UNCHECKABLE.has(status)) {
      unchecked.push(`${file}: ${target} answered ${status}, which means it declined to say`)
      continue
    }
    failures.push(`${file}: ${target} answered ${status || 'nothing (connection failed)'}`)
  }
  console.log(`  ${seen.size} distinct URL(s): ${reachable} reachable, ${unchecked.length} unchecked`)
}

for (const u of unchecked) console.log(`  unchecked: ${u}`)

if (failures.length === 0) {
  console.log('all links resolve')
  process.exit(0)
}
console.error(`\n${failures.length} problem(s):`)
for (const f of failures) console.error(`  ${f}`)
process.exit(1)
