# Mapping with a key

A create-react-app project for the `key` prop: it renders a list from state and gives each item a stable
key, which is what stops React from reusing the wrong DOM node when the list changes. The lesson walks
through what goes wrong with an index as the key and what a timestamp fixes.

Part of the [props](../../02_1_props.md) lesson.

## Run it

```sh
npm install
npm start        # or: npm test, npm run build
```

These three commands are create-react-app's, so `npm start` opens a dev server on port 3000, `npm test`
runs jest in watch mode, and `npm run build` writes a production bundle to `build/`.

The pinned `react-scripts` is 3.0.1, from 2019. It installs and its tests pass on a current Node, which is
more than can be said for most tooling of that vintage, so nothing here needs a flag.
