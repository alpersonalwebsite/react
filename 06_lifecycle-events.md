## Life-cycle events

These are methods that allow us to execute certain functionality during the Component´s life-cycle (`Class-based Components`) 

*Note*: We will see as well `hooks` which are the "equivalent" for `Functional Components`.

**Order of execution:**

1. `constructor(props)` > Initialization
2. `getDerivedStateFromProps(props, state)` > To update state based on changes on props
3. `render()` > Logic and return. It will render the particular component and its child. 
4. `componenDidMount()` > Here's where we cause or produce side-effects like fetching data.

Examples:

* Before the Component is inserted into the DOM > **componentWillMount()**
* After the Component is inserted into the DOM > **componentDidMount()**
  This is the most used one. Example: AJAX requests.

* Whenever the component is going to receive NEW props > **componentWillReceiveProps()**

* Before the Component is removed from the DOM > **componentWillUnmount()**

<!--
  TODO: Add others and separate by deprecation.
-->
