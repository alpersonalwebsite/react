# Local state

A create-react-app project with the same UI built twice, once as a class component holding state and once
as a functional component receiving props, so the two sit side by side in one page.

Part of the [local state](../../03_local-state.md) lesson.

## Run it

```sh
npm install
npm start        # or: npm test, npm run build
```

These three commands are create-react-app's, so `npm start` opens a dev server on port 3000, `npm test`
runs jest in watch mode, and `npm run build` writes a production bundle to `build/`.

The pinned `react-scripts` is 3.0.1, from 2019. It installs and its tests pass on a current Node, which is
more than can be said for most tooling of that vintage, so nothing here needs a flag.
