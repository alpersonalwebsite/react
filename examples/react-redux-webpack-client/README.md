# Redux and webpack, client only

A React and Redux application built with webpack directly rather than through create-react-app, so every
piece of the toolchain is visible: babel config, dev and production webpack configs, jest with enzyme, and
code splitting across two bundles.

Part of the [webpack](../../11_webpack.md) lesson.

## Run it

```sh
npm install
npm test
NODE_OPTIONS=--openssl-legacy-provider npm run build
npm start        # dev server on port 8080
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
