# React

A JavaScript library for building user interfaces.

More than 5 years have passed since the official React´s release (*Facebook - March 2013*); nevertheless, the community interest and adoption are in constant growth.

---

*Metric 1:* `github` stars - 06/02/2019

* **[140_271]** [vuejs/vue](https://github.com/vuejs/vue)
* **[130_395]** [facebook/react](https://github.com/facebook/react)
* **[59_562]**[angular/angular.js](https://github.com/angular/angular.js)
* **[51_687]** [jquery/jquery](https://github.com/jquery/jquery)
* **[48_767]** [angular/angular](https://github.com/angular/angular)

*Metric 2:* `dependent repositories` - 06/02/2019

* **[2_037_095]** [facebook/react](https://github.com/facebook/react)
* **[862_083]** [vuejs/vue](https://github.com/vuejs/vue)
* **[330_978]** [jquery/jquery](https://github.com/jquery/jquery)

---

Every time I talked with young DEVs, the React´s stamp widely extends its real existence… For the new rows of builders, handling UIs without a solid framework (we can also modestly include Angular, Vue.js…) is something unthinkable and, perhaps, fumes of an old-past ready to be forgotten.
No matter the tool that you pick to support your work (here´s an elder Angular´s patron) we all want the same:

* Simplicity
* Scalability
* Security (everything is converted into a string before render). This prevents XSS.

## Why React...?

* Composition: small integrated pieces of code (components) that allow us to build complex UI.
* Use of objects to build the UI.
* Declarative approach: we "tell" what we want not "how/steps to" obtain what we want (imperative)
* Unidirectional data flow (from parent to child component) or "one way binding"
* JavaScript logic: we use just JS (not a particular templating library)
* Server Side Integration (SSR as first render)
* Mobile Apps Development with React Native

We are going to follow [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)

---

### SPA: Single Page Applications

The idea under SPA is having a single HTML document using JS to change what the user sees on the screen, avoiding, in consequence, having to refresh the page.
So, if the user clicks on x-link, x-data (remember that we have everything downloaded on the "first load": HTML/CSS/JS) is going to be requested asynchronously showing the proper view for that particular set of data.

React does not require a SPA implementation or approach. You can mix React with other JS libraries, use it partially (for certain features) and combine it with `Server Side Logic`.

At future we are going to see...

1. Routing
2. Keep UI and URL in sync: particular content for each route (allowing you to copy and paste a URL on the browser´s address bar, or, interact with other of its control elements like the "Go back" arrow).

For this, we are going to use `react-router-dom` package. I strongly encourage you to read **React Router** [documentation](https://github.com/ReactTraining/react-router).

---

### What´s JSX...?

It´s an extension to JS syntax recommended by React to describe how our UI. It´s not mandatory; just a really convenient and standardized way of structure our component´s rendering.

*Note:* It´s important to remember React´s motto: `A JavaScript library for building user interfaces.` Following this notion, you will find coherent to have a strict relation between `logic` and `markup` in the same small unit or component.

Here´s and example using `JSX`

```javascript
class SayHi extends React.Component {
  render() {
    return <div>Hi {this.props.name}</div>;
  }
}

ReactDOM.render(<SayHi hisName="Peter" />, document.getElementById('root'));
```

And the same example (transpiled with Babel) with `plain or vanilla JavaScript`

```javascript
class SayHi extends React.Component {
  render() {
    return React.createElement('div', null, 'Hi ', this.props.name);
  }
}

ReactDOM.render(
  React.createElement(SayHi, { hisName: 'Peter' }),
  document.getElementById('root')
);
```

*Note:* Babel is used to compile or transpile ES6 code into syntax that old browsers can interpret.
