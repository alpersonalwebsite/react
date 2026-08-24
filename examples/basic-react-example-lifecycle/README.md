# Lifecycle events

A create-react-app project that logs every lifecycle method as it fires, so you can watch the order in
which React calls `constructor`, `render`, `componentDidMount`, `componentDidUpdate` and
`componentWillUnmount`. Open the console and interact with the page: the sequence is the lesson.

Part of the [lifecycle events](../../06_lifecycle-events.md) lesson.

## Run it

```sh
npm install
npm start        # or: npm test, npm run build
```

These three commands are create-react-app's, so `npm start` opens a dev server on port 3000, `npm test`
runs jest in watch mode, and `npm run build` writes a production bundle to `build/`.

The pinned `react-scripts` is 3.0.1, from 2019. It installs and its tests pass on a current Node, which is
more than can be said for most tooling of that vintage, so nothing here needs a flag.
