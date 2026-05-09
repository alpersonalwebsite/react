# React

[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

**Original MOTTO:** An easy way to learn React through examples.

**Updated MOTTO:** Learning React topic by topic.

## Table of contents

### Intro

- [00.0 Intro to React](./00_0_intro.md)
- [00.1 JS beyond JavaScript](./00_1_intro_JS.md)
- [00.2 Functional Programming patterns](./00_2_intro_JS-patterns.md)
- [00.3 ES2015 / ES6 essentials](./00_3_intro_es2015.md)

### Getting started

- [01.0 First steps with React](./01_0_starting.md)
- [01.1 React Elements](./01_1_elements.md)
- [01.2 JS Module Systems](./01_2_JS-module-systems.md)

### Components & data

- [02.0 Components](./02_0_components.md)
- [02.1 Props](./02_1_props.md)
- [03 Local state](./03_local-state.md)
- [04 Methods](./04_methods.md)
- [05 Controlled components & forms](./05_controlled-components.md)
- [06 Lifecycle events](./06_lifecycle-events.md)
- [07 Conditional rendering](./07_conditional-rendering.md)

### Ecosystem

- [08 Redux](./08_redux.md)
- [09 Packages (PropTypes, React Router, Redux Logger, Redux Thunk, Axios)](./09_packages.md)
- [10 Unit tests](./10_unit-tests.md)
- [11 Webpack (custom toolchain, SSR)](./11_webpack.md)
- [12 Full client app — layouts](./12_full-client-app.md)

## Before starting

---

*2/21/19 UPDATE*: 
Many things happened in `React` and its ecosystem. I will try to update the sections to `React 16.8.\*` (`Hooks` and some interesting `new APIs`) and go deeper in the “Life cycle” paragraph for class-based Components. Also, I will be splitting sections in sub-sections for better understanding and proper grouping.

---

After several years of contributing, mentoring and working with `JS` and `React`, I decided to “put together” some notes linked to recurrent doubts and obstacles that friends and co-workers have to face daily.

This is a pure practical guide (*ps*, it was at the beginning): please, keep the `practical intention` present throughout these "shared notes"; I don't have the intent of challenging the great and plentiful coaching classes, nor the books/"white papers" that today, you can easily find anywhere (starting with Facebook's own proprietary documentation).

My aim, as I stated before (even with the latest add-ons and updates), is -still- clearly pragmatic. You will see some concepts and technicalities (as general and well-needed context), but you should (perhaps must) complement this "joint exercise" with other materials. I try to avoid quoting or referencing, given that an important part of your training is discovering good sources and picking those that satisfy your own and extremely personal "way to learn". However, taking a look at the mother source will not hurt you: [react](https://github.com/facebook/react).

## Getting Started

### Pre-requisites

You should have an intermediate knowledge of `JavaScript`, including some exposure to [ES2015 / ES6](http://es6-features.org). The lessons introduce more advanced topics (closures, currying, the event loop) as needed, but a missing JS foundation will make the React parts much harder than they need to be.

Concretely, before starting you should be comfortable with:

- ES6+ syntax: `let`/`const`, arrow functions, template literals, default parameters, rest/spread.
- Destructuring (objects and arrays) and shorthand object properties.
- Modules: `import`/`export` (default and named).
- Higher-order functions and array methods: `.map()`, `.filter()`, `.reduce()`.
- Asynchronous JavaScript: callbacks, promises, `async`/`await`.
- The `this` keyword and how its value is determined.
- Prototypes and class syntax.

If any of these are unfamiliar, work through the [Intro](./00_0_intro.md) chapters first and come back when they feel comfortable.

Before proceeding with the tutorial, be sure that you have installed or, install...

**Required**

* [Node.js](https://nodejs.org/en/download/)
* Package manager (`npm` which comes with `Node` or `yarn`)

*Note:* packages, dependencies, libraries... are going to be referenced on-demand. Those whose scope is bigger will be addressed in [09_packages](./09_packages.md)

**Recommended**

* For Windows users: `Git bash` https://git-scm.com/downloads as a `CMD` replace, or, `PowerShell`

**Alternatives**

* yarn https://yarnpkg.com/lang/en/docs/install/
  
  Alternative to `npm`. I will be using `yarn`
  (At the moment of writing this `doc` there are no major differences between the two.)

  Learn more about the [npm registry](https://docs.npmjs.com/misc/registry) consumed by both, `yarn` and `npm`