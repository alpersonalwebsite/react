#!/usr/bin/env node
/**
 * Parse every code snippet in the lesson files.
 *
 * These 22 files are the repository's actual content, and almost all of it is
 * code. Two earlier passes went through them by hand for correctness; nothing has
 * ever checked that the snippets are even syntactically valid, which is the floor
 * below which a reader cannot copy anything successfully.
 *
 * WHAT IT CHECKS, and deliberately no more:
 *
 *   javascript blocks   parsed with @babel/parser, JSX and the era's proposal
 *                       plugins enabled.
 *   json blocks         parsed with JSON.parse. A malformed config example is
 *                       worse than none, because it gets pasted.
 *
 * FRAGMENTS ARE THE NORM HERE, AND THE CHECK IS SHAPED AROUND THAT. Teaching
 * notes show a lifecycle method without its class, a piece of JSX without its
 * component, the interesting three lines of a package.json without the braces
 * around them. Measured on the first run of this script, 64 of 74 "failures" were
 * exactly that. Demanding a skip marker on each would have buried the four real
 * defects under 64 annotations, and a check nobody can read is a check nobody
 * runs.
 *
 * So a snippet passes if it parses in ANY plausible context: on its own, inside a
 * class body, inside a function body, or as an expression. JSON passes on its own
 * or wrapped in braces. A failure therefore means the text cannot be valid
 * anywhere, which is a genuine syntax error rather than an artefact of how much
 * of the file was quoted.
 *
 * That is a weaker check than "every snippet is a complete program", and it is the
 * strongest one this content admits. It still catches what matters: a lesson here
 * contained
 *
 *   it('updates the value of `friend` state's property', () => {
 *
 * where the apostrophe closes the string, and no context makes that parse.
 *
 * A lone `...` line is stripped before parsing. These notes use it to mean "and
 * the rest", which is a documentation convention rather than spread syntax.
 *
 * WHY NOT EXECUTE THEM. Almost every snippet here is a fragment: a component
 * with no render call, a reducer with no store, a method lifted out of a class.
 * Executing a fragment means inventing the context around it, and then the check
 * verifies the scaffolding as much as the snippet. The example projects under
 * examples/ are where the code actually runs, and CI builds and tests those. This
 * script covers the thing those projects cannot: the prose's own code.
 *
 * TAGS ARE MATCHED CASE-INSENSITIVELY, which is load-bearing rather than tidy.
 * These files use three spellings: `javascript` 278 times, `javaScript` 13 times
 * and `JavaScript` once. A case-sensitive match would skip 14 blocks and still
 * exit 0.
 *
 * A fenced block can also be marked with a first-line comment when parsing it is
 * not the point:
 *
 *   // check: skip <reason>   a deliberate syntax error being demonstrated, or a
 *                            shell transcript in a javascript fence. The REASON
 *                            IS REQUIRED, so a skip has to be argued for in the
 *                            file where a reader can see it.
 */

import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from '@babel/parser'

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..')
// Lesson files only: the examples' own READMEs describe how to run a project and
// their snippets are shell, not source.
const files = execFileSync('git', ['-C', repo, 'ls-files', '*.md'], { encoding: 'utf8' })
  .split('\n')
  .filter((f) => f && !f.includes('/'))
  .sort()

// Era-appropriate plugin set: React 16 class components with class properties,
// object spread in reducers, dynamic import for code splitting. Nothing here
// needs a proposal newer than the repository.
const PLUGINS = [
  'jsx',
  'classProperties',
  'classPrivateProperties',
  'objectRestSpread',
  'dynamicImport',
  'optionalChaining',
  'nullishCoalescingOperator',
]


/** These notes use a lone `...` to mean "and the rest". Not spread syntax. */
function stripEllipses(source) {
  return source
    .split('\n')
    .filter((l) => !/^\s*(\.\.\.|\/\/\s*\.\.\.|\/\*\s*\.\.\.\s*\*\/)\s*,?\s*$/.test(l))
    .join('\n')
}

/**
 * Parse a snippet in each context a teaching fragment plausibly comes from, and
 * return the FIRST error only if none of them works. The first error is the one
 * reported because it is the error against the snippet as written, which is what
 * a reader who pastes it will see.
 */
function parseInAnyContext(source) {
  const text = stripEllipses(source)
  // A trailing comma is normal when a fragment was cut out of a longer list, and
  // it is what stops the object-literal and JSON shapes below from parsing.
  const trimmed = text.replace(/,\s*$/, '')
  const shapes = [
    text,
    `class __Fragment__ {\n${text}\n}`,
    `function __fragment__() {\n${text}\n}`,
    `(\n${text}\n)`,
    `<__Fragment__>\n${text}\n</__Fragment__>`,
    // A piece of a config object: `entry: { … }`, `path: path.resolve(…)`.
    `const __o__ = {\n${trimmed}\n}`,
    // A piece of an array, or several statements missing their opening brace.
    `const __a__ = [\n${trimmed}\n]`,
  ]
  let first = null
  for (const shape of shapes) {
    try {
      parse(shape, { sourceType: 'unambiguous', allowReturnOutsideFunction: true, plugins: PLUGINS })
      return null
    } catch (err) {
      if (first === null) first = err
    }
  }
  return first
}

const JS_TAGS = new Set(['javascript', 'js', 'jsx'])
const failures = []
let jsBlocks = 0
let jsonBlocks = 0
let skipped = 0
let bare = 0
let other = new Map()

for (const file of files) {
  const lines = readFileSync(join(repo, file), 'utf8').split('\n')
  let open = null
  for (let i = 0; i < lines.length; i++) {
    const m = /^```(\S*)\s*$/.exec(lines[i])
    if (!m) {
      if (open) open.body.push(lines[i])
      continue
    }
    if (!open) {
      open = { tag: m[1], line: i + 1, body: [] }
      continue
    }

    const { tag, line, body } = open
    open = null
    const source = body.join('\n')
    const lower = tag.toLowerCase()

    const first = body.find((l) => l.trim() !== '') ?? ''
    const skip = /^\s*\/\/\s*check:\s*skip\b\s*(.*)$/.exec(first)
    if (skip) {
      if (!skip[1].trim()) {
        failures.push({ where: `${file}:${line}`, message: '`// check: skip` with no reason given' })
      }
      skipped++
      continue
    }

    if (tag === '') {
      bare++
      continue
    }
    if (JS_TAGS.has(lower)) {
      jsBlocks++
      const err = parseInAnyContext(source)
      if (err) {
        const at = err.loc ? line + err.loc.line : line
        failures.push({
          where: `${file}:${at}`,
          message: 'snippet does not parse in any context',
          detail: `${err.message.replace(/\s*\(\d+:\d+\)\s*$/, '')}\n  ${(body[(err.loc?.line ?? 1) - 1] ?? '').trim()}`,
        })
      }
      continue
    }
    if (lower === 'json') {
      jsonBlocks++
      const stripped = stripEllipses(source)
      const noTrailingComma = stripped.replace(/,\s*$/, '')
      let ok = false
      for (const candidate of [stripped, `{${noTrailingComma}}`, `[${noTrailingComma}]`]) {
        try {
          JSON.parse(candidate)
          ok = true
          break
        } catch {
          /* try the next shape */
        }
      }
      if (!ok) {
        failures.push({
          where: `${file}:${line}`,
          message: 'json block does not parse, on its own or wrapped',
          detail: stripped.split('\n').slice(0, 3).join('\n'),
        })
      }
      continue
    }
    other.set(lower, (other.get(lower) ?? 0) + 1)
  }
  if (open) failures.push({ where: `${file}:${open.line}`, message: 'unterminated ``` fence' })
}

console.log(
  `${files.length} lesson files: ${jsBlocks} javascript block(s) parsed, ${jsonBlocks} json block(s) parsed, ` +
    `${skipped} skipped`,
)
console.log(
  `  bare fences: ${bare}, other tags: ${[...other].map(([t, n]) => `${t} ${n}`).join(', ') || 'none'}`,
)

if (failures.length === 0) {
  console.log('no failures')
  process.exit(0)
}

const byCategory = new Map()
for (const f of failures) {
  const key = f.message.replace(/`+[^`]*`+/g, '<x>')
  byCategory.set(key, (byCategory.get(key) ?? 0) + 1)
}
console.error(`\n${failures.length} failure(s) in ${byCategory.size} categor${byCategory.size === 1 ? 'y' : 'ies'}:`)
for (const [k, n] of [...byCategory].sort((a, b) => b[1] - a[1])) console.error(`  ${String(n).padStart(4)}  ${k}`)
for (const f of failures) {
  console.error(`\n  ${f.where}: ${f.message}`)
  if (f.detail) console.error(f.detail.replace(/^/gm, '    '))
}
process.exit(1)
