## Lifecycle events

These are methods (also known as "hooks") that allow us to execute certain functionality during the Component´s life.

Examples:

* Before the Component is inserted into the DOM > **componentWillMount()**
* After the Component is inserted into the DOM > **componentDidMount()**
  This is the most used one. Example: AJAX requests.

* Whenever the component is going to receive NEW props > **componentWillReceiveProps()**

* Before the Component is removed from the DOM > **componentWillUnmount()**

<!--
  TODO: Add others and separate by deprecation.
-->
