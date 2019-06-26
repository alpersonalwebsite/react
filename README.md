# React

[![Greenkeeper badge](https://badges.greenkeeper.io/alpersonalwebsite/react.svg)](https://greenkeeper.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

**Original MOTTO:** An easy way to learn React through examples.

**Updated MOTTO:** Learning React topic by topic.

## Before starting

---

*2/21/19 UPDATE*: 
Many things happened in `React` and its ecosystem. I will try to update the sections to `React 16.8.\*` (`Hooks` and some interesting `new APIs`) and go deeper in the “Life cycle” paragraph for class-based Components. Also, I will be splitting sections in sub-sections for better understanding and proper grouping.

---

After several years of contributing, mentoring and working with `JS` and `React`, I decided to “put together” some notes linked to recurrent doubts and obstacles that friends and co-workers have to face daily.

This is a pure practical guide (*ps*, it was at the beginning): please, keep the `practical intention` present during the course of these "shared notes"; I don´t have the intent of challenging the great and plentiful coaching classes; neither the books/"white papers" that today, you can easily find anywhere (starting with the own Facebook´s proprietary documentation).

My aim, as I stated before (even with the latests addons and updates), is -still- clearly pragmatic. You will see some concepts and technicalities (as general and well-needed context) but you should (perhaps must) complement this "joint exercise" with other materials (I try to avoid quoting or referencing given that, an important part of your training is discovering good sources and picking those that satisfy your own and extremely personal "way to learn".
However, taking a look the the mother source will not hurt you: [react](https://github.com/facebook/react)).

## Getting Started

### Pre-requisites

You DO need to have an intermediate knowledge of `JavaScript` and, preferably, some exposure to [es2015 or ES6](http://es6-features.org).
Even when "more complex topics" (not ordinary ones) are addressed as needed as part of the "lessons" (for example *leaks*, *currying*) not having an underlying `JS` base at all will generate more doubts and it could guide you to frustration, and ultimately, a premature failure. 
If you don´t have experience with `JavaScript`, some familiarity with `Functional Programming` and `Prototypes`... Please, first resolve the context of `this` and `then` come back (btw, if this made you smile, you should be good).

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
  (At the moment of writing this `doc` there are no major differences between the two, as it used to...)

  Learn more about the [npm registry](https://docs.npmjs.com/misc/registry) consumed by both, `yarn` and `npm`