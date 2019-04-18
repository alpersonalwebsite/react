## Life-cycle events

These are methods that allow us to execute certain functionality during the Component´s life-cycle (this is for `Class-based Components`. We will see as well `hooks` which are the "equivalent" for `Functional Components`). 

**Order of execution:**

1. `constructor(props)` > Initialization
2. `getDerivedStateFromProps(props, state)` > To update state based on changes on props
3. `shouldComponentUpdate(nextProps, nextState)` > We can stop or prevent unnecessary re-renders improving performance.  
4. `render()` > Logic and return. It will render the particular component and its child. 
5. `getSnapshotBeforeUpdate(prevProps, prevState)` > Returns a snapshot (object).
6. `componenDidMount()` > Here's where we cause or produce side-effects like fetching data (HTTP request)
7. `componentDidUpdate(prevProps, prevState, snapshot)` > Here's where we cause or produce side-effects like fetching data (HTTP request)

**Deprecated life-cycles**

1. `componentWillMount()`: before the Component is inserted into the DOM
2. `componentWillReceiveProps()`: whenever the component is going to receive NEW props
3. `componentWillUnmount()`: before the Component is removed from the DOM
   
<!-- Missing replacements, UNSAFE...
https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html  -->

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
