## Components

We use components to split our UI into reusable "blocks" that can receive `props` (aka, read-only data), hold `state` (aka, mutable data) and return, as we saw earlier, `React elements`.

*Note*: Remember that `props` are inputs to Components. We pass them from parent to child. This is the *unidirectional data flow* pattern.

You should name your component following the *CamelCase* (also called *UpperCamelCase*) convention. 

Example: `<ListOfRecords />`; use *lowerCamelCase* for `DOM elements`, `HOC`/`HOF` and `methods` in general.

*Note:* Some people also name *functional components* following the *lowerCamelCase* standard, but, once they import them they rename them switching to *CamelCase*. They keep the filename with *CamelCase*

Example:

**Item.js**
```javascript
const item = () => 'This is an item'
export default item
```

**ListOfItems.js**
```javascript
import Item from './Item'

const Items = () => <Item />
```

---

In `react` we have *2 types of Components*:

In relation to `paradigm`...
1. Class components (**pseudo** Object Oriented Programing)
2. Functional components (Functional Programing)

In relation to internal or `local state`
1. Stateful components
2. Stateless, pure or presentational components (with no state management)

Before `React 16.8` (aka, before `Hooks`), functional components were not able to hold `state`. Be particularly aware of this if you are following an outdated tutorial or working with "legacy code".

### Class Component

```javascript
import React, { Component } from 'react';

/* Or, if you don't 'destructure' 
class App extends React.Component {}
*/
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello World!</h1>
      </div>
    );
  }
}

export default App;
```

*Note:* Class components require `render()` method.

### Functional Component

Regular JS functions that return a `React element` or `Component`.

Example: **pre ES6**

```javascript
function App() {
  return (
    <div className="App">
      <h1>Hello World!</h1>
    </div>
  );
}
```

Example: **ES6**
(...with implicit return)

```javascript
import React from 'react';

const App = () => (
  <div className="App">
    <h1>Hello World!</h1>
  </div>
);

export default App;
```

**Functional components** *perform better* than class components and, after the release of `Hooks`, in "90%" of the cases you should go with this approach.

---

Quick note about `return`.

Each component must always return "something": JSX, plain JS Data Types like number, string, array, or "null" if we explicitly "don't want to return". You cannot avoid the return statement or "return implicitly": `return;`.

All these (among others) are valid returns:
* `return 1;`
* `return [1,2,3,4]` OR `return [1,2,3,4].map(element => element)`
* `return null;`
* `return <div>{[1,2,3,4]}</div>;`
* `return <div>Hi</div>;`

As you can see, we are always returning one MAIN or root element.
*Note:* an array is a collection of elements, but *ONE element* in essence.

However, if you try something like...

```javascript
return <div>1</div><div>2</div>
```
... you will see the following error: 
`Parsing error: Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?`.

This is happening because React expects just one root element (and within it, zero or multiple adjacent child).

There are several ways to fix it...

1. Wrap everything within a *parent/root element* (example: div)
*IMPORTANT: With this solution you will have an extra div in your markup, which could force you to have to override default element's behavior or styling for "presentational purposes".*
```javascript
return <div><div>1</div><div>2</div></div>
```

2. Create a *HOC* (Higher Order Component) returning what we are passing as `children` 

    Notes:
   * This HOC will just wrap our component.
   * Children will be "whatever" we pass between yhe opening and closing tags> `<Wrapper>...</Wrapper>Wrapper>`
```javascript
const Wrapper = props => props.children;

const App = props => {
 return <Wrapper><div>1</div><div>2</div></Wrapper>
}
```

3. Use *React.Fragment*
```javascript
return <React.Fragment><div>1</div><div>2</div></React.Fragment>
```

In the solution #2 we used a **HOC** 

If you checked our `intro`, an particularly, the appendix *Higher Order Functions*, probably you can guess what *HOC* refers to: *a component that takes another component as parameter and returns a new component*.

There's another way of creating and utilizing a *HOC*: *a regular JS function that takes a component as parameter and returns a functional component*.

```javascript
const App = props => {
  return <div>Hi!</div>
}

const withWrapper = ComponentToWrap => {
  return props => {
    return (
      <React.Fragment>
        <h1>Welcome!</h1>
        <ComponentToWrap {...props} />
      </React.Fragment>
    )
  }
}


export default withWrapper(App);
```

*When should you use this approach...?* Whenever you want to execute some kind of logic. 
For dealing with plain markup or JSX, you can opt for the previous approach. 

**IMPORTANT:** Be sure to spread the props `<ComponentToWrap {...props} />` to avoid issues (not applicable for this example since we are not passing>receiving>rendering props).



---

### Composition

One of the key aspects of React is `Composition`. Following this logic, we can have -multiple- **small components** as part of the `JSX` (or output).

Example:

```javascript
const App = () => (
  <div className="App">
    <h1>Hello World!</h1>
    <IntroComponent />
    <LanguageComponent default="en">
    <ContactComponent>
  </div>
);
```

Remember that **small components** contribute to the re-usable nature of React and its compositional view. However, try to avoid being extremely granular and always preserve the logic´s context and usage.
Example:

* A Car could be the main (or App) component
* Door could be a reusable component. We can call it as many times as doors our main component has.
* The Door component contains children, like handle (which include door-lock as prop)

Nevertheless, we are not going to dissect the door-lock until we have screws, metal, plastic and paint... Even when (for example) screws are going to be used in several elements.

Think in elements as words and components as phrases.