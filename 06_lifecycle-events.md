## Life-cycle events

These are methods that allow us to execute certain functionality during the Component´s life-cycle (this is for `Class-based Components`. We will see as well `hooks` which are the "equivalent" for `Functional Components`). 

A Component goes through three phases — **Mounting**, **Updating** and **Unmounting** — and the methods called in each phase are different. The lists below are split that way; do not assume the methods always run in the same order across phases.

**Mounting** (the very first time the Component is inserted into the DOM):

1. `constructor(props)` > Initialization
2. `static getDerivedStateFromProps(props, state)` > To update state based on changes on props
3. `render()` > Logic and return. It will render the particular component and its children.
4. `componentDidMount()` > Here's where we cause or produce side-effects like fetching data (HTTP request)

**Updating** (every render after the first one — triggered by new props, `setState()`, or `forceUpdate()`):

1. `static getDerivedStateFromProps(props, state)`
2. `shouldComponentUpdate(nextProps, nextState)` > We can stop or prevent unnecessary re-renders improving performance.
3. `render()`
4. `getSnapshotBeforeUpdate(prevProps, prevState)` > Returns a snapshot (object) handed to `componentDidUpdate` as its third argument.
5. `componentDidUpdate(prevProps, prevState, snapshot)` > Side-effects in response to a prop/state change (e.g. fetching data when the URL params change). Always guard with a comparison or you will loop.

**Unmounting** (right before the Component is removed from the DOM):

1. `componentWillUnmount()` > Clean up: cancel timers, unsubscribe, abort in-flight requests, etc.

**Deprecated / renamed `UNSAFE_*` life-cycles** (still callable, but they trigger a warning in `StrictMode` and were renamed because they are not safe under React's concurrent rendering):

1. `componentWillMount()` → `UNSAFE_componentWillMount()`: before the Component is inserted into the DOM
2. `componentWillReceiveProps()` → `UNSAFE_componentWillReceiveProps()`: whenever the component is going to receive NEW props
3. `componentWillUpdate()` → `UNSAFE_componentWillUpdate()`: just before re-rendering

Note: `componentWillUnmount()` was **not** deprecated — it is still the standard cleanup hook in class components. The blog post that announced these changes is the canonical reference: https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html

```
App > constructor()
App > getDerivedStateFromProps() {}
App > render()
Child > render()
App > componentDidMount()
```
And, if you click in the button (which updates the state property name in `App Component` and passes it to `Child as props`):

```
App > getDerivedStateFromProps() {}
App > render()
Child  > shouldComponentUpdate()
Child > render()
Child > getSnapshotBeforeUpdate()
Child > componentDidUpdate()
{friend: "Peter"}
```

You will also see the following warnings that will prevent the execution of "the *will* life-cycles"

```
Warning: Unsafe legacy lifecycles will not be called for components using new component APIs.

App uses getDerivedStateFromProps() but also contains the following legacy lifecycles:
  componentWillMount
```

```
Warning: Unsafe legacy lifecycles will not be called for components using new component APIs.

Child uses getSnapshotBeforeUpdate() but also contains the following legacy lifecycles:
  componentWillReceiveProps
  componentWillUpdate
```

<!--
  TODO: Add others and separate by deprecation.
-->
