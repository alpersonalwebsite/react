# Redux and webpack, client and server

The client-only example plus server-side rendering: an express server renders the app to a string, serves
the pre-compressed bundles with `express-static-gzip`, and hands over to the client. This is the one the
full-client-app lesson builds toward.

Part of the [webpack](../../11_webpack.md) lesson.

## Run it

```sh
npm install
npm test
NODE_OPTIONS=--openssl-legacy-provider npm run build
npm run dev      # development, with the server
npm run prod     # production
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
