# webpack, with no configuration

The smallest webpack project there is: two source files, no config file, and the defaults. It exists to
show what webpack does before you tell it anything, which is to read `src/index.js` and write
`dist/main.js`.

Part of the [webpack](../../11_webpack.md) lesson.

## Run it

```sh
npm install
NODE_OPTIONS=--openssl-legacy-provider npx webpack
```

## One flag you will need

webpack 4 hashes modules with md4, and OpenSSL 3 removed md4 from its default provider, so on Node 17 and
later a build stops before it starts:

```
Error: error:0308010C:digital envelope routines::unsupported
code: 'ERR_OSSL_EVP_UNSUPPORTED'
```

That is not a problem with this example, and upgrading webpack is not the answer for notes pinned to their
era. Ask node for the old provider:

```sh
NODE_OPTIONS=--openssl-legacy-provider npm run build
```

Measured on Node 24: `crypto.createHash('md4')` throws without that flag and succeeds with it, and the build
then completes normally.
