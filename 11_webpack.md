## Webpack

<!-- TODO:
What is
What´s a bundle.
Others like Webpack >  Browserify
-->

Quoting _Webpack_ documentation (which you should check regularly), "_webpack is a static module bundler for modern JavaScript applications_".
It takes all the files (let´s just care, at least for the moment, only about `\*.js`) wired up in our project and generates a bundle(s) that will be used as our "static files or assets".

As always, the best way to illustrate this statement is through a basic example.
Hands at work!

Create a new folder

```
mkdir webpack
cd webpack
```

Initiate the project (`-y` is the default flag)

```
npm init -y
```

Install `webpack` and `webpack-cli`

```
npm install --save-dev webpack webpack-cli
```

Edit your `package.json` and add the following script:

```json
  "build": "webpack --config=webpack.config.js"
```

Create the file `webpack.config.js`

```
touch webpack.config.js
```

**webpack.config.js**

```javascript
const path = require('path');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

Create the `dist` folder

```
mkdir dist
```

Inside dist create the file `index.html`

```
touch index.html
```

**index.html**

```html
<body>
    <h1>Testing Webpack...!</h1>
    <script src="bundle.js"></script>
</body>
```

Create the folder `src`

```
mkdir src
```

Inside `src` create the files `app.js`, `index.js` and `other.js`

```
touch app.js index.js other.js
```

**index.js**

```javaScript
import App, { someFunction } from './app';

console.log('index.js');

someFunction();
```

**app.js**

```javaScript
console.log('app.js');

module.exports.someFunction = () => {
  console.log('app.js > someFunction');
};
```

**other.js**

```javaScript
console.log('other.js');
```

Inside your root directory, `webpack`, run...

```
npm run build
```

You will see the following output...

```
> wp@1.0.0 build C:\webpack
> webpack --config=webpack.config.js

Hash: 78cc493c0b28897f196a
Version: webpack 4.23.1
Time: 96ms
Built at: 2018-11-01 18:14:50
    Asset      Size  Chunks             Chunk Names
bundle.js  4.55 KiB    main  [emitted]  main
Entrypoint main = bundle.js
[./src/app.js] 115 bytes {main} [built]
[./src/index.js] 91 bytes {main} [built]
```

Open your `index.html` and check the console.

Result:

```
app.js app.js:1:1
index.js index.js:6:1
app.js > someFunction app.js:4:3
```

A new static file will be hosted on your dist/; the file: bundle.js
Open that file. Outside webpack code, you will find your transpiled and "bundled code".

So... We have a configuration file, webpack.config.js, where we are defining our entry point, or the file which will wire (directly or indirectly) the other ones resulting in webpack output: bundle.js; this bundle contains the code of the entry or main file index.js and also app.js which is imported on index.js. However, we have the file other.js which was not included since it´s not part of the "cabling". As soon as we wire it up to index.js or app.js, it will be included in our bundle.

We could also add it to our entry object

webpack.config.js

```javascript
entry: {
  main: './src/index.js',
  other: './src/other.js'
},
```

In this case, we are going to remove from output the following line `filename: 'bundle.js',` since, if not, once it generates the first bundle it will try to generate the second with the existing bundle name of bundle.js

Now, after executing `npm run build` we will have 2 bundles:

```
Built at: 2018-11-02 18:30:48
   Asset      Size  Chunks             Chunk Names
 main.js  4.58 KiB    main  [emitted]  main
other.js   3.8 KiB   other  [emitted]  other
```

If you do this, remember to update your `\*.html` file

```html
<body>
    <h1>Testing Webpack...!</h1>
    <script src="main.js"></script>
    <script src="other.js"></script>
</body>
```

Alternatively, if you want to be able to keep the `filename property` and/or rename the resulting files, you can use the `[name] namespace`
Example:

```javascript
output: {
  filename: '[name]-bundle.js',
  path: path.resolve(__dirname, 'dist')
}
```

If you do this, remember to update your `index.html` with the proper naming of the `*.js` files, in our case:

* main-bundle.js
* other-bundle.js

Open `other.js` (or, other-bundle.js, or, whatever you decided to call this file).
Remember that in our webpack configuration file we set the flag development...? Well, change it to production: `mode: 'production',`.

Build the project again.

Go to `other.js`.
Yes...! Webpack is concatenating, minifying and -just- bundling the code needed for production, preserving the order of execution of our files or modules.

We can compare both builds...

On DEV mode

```
main.js  4.58 KiB    main  [emitted]  main
other.js   3.8 KiB   other  [emitted]  other
```

On PROD mode

```
main.js   1.09 KiB       0  [emitted]  main
other.js  962 bytes       1  [emitted]  other
```

All this, just adding the webpack dependency to our project and setting a few options.
Even when this configuration is probably the most basic one, you can start seeing the power and flexibility of webpack. Also, its "discernment"... Everything outside the entry points that´s not indexed as part of the project, will not be part of the output.

---

### JS Module Systems

At the beginning of the React´s Introduction, we saw how we could reuse and enhance our code through components and (forgive the redundancy) compose "as a whole" more complex units. Anew, the idea of blocks of different shapes, colors and sizes encasing with each other (in a direct or intermediate relation) comes to our attention.

This topic (JS Module Systems) is extremely close to the compositional POV: just replace components with modules and you will have a clear inaugural understanding.

Daily, we write logic (or logic plus UI). It´s not strange that, with some recurrence, if we architected our projects in the right way ("standardization") we will find ourselves reusing previous code.
During your first steps, copying and pasting code between files was something forgivable: far away from a good practice, nor an useful methodology, but, in those moments you were struggling with bigger priorities. Now, however, having a deeper understanding imagine if every time you want to consume "x-function" you manually ad its code to the particular file, and, one day, you have to update or enhance your function. Yes, global search will help you but this approach will never scale.
With this in mind, we could create a module (or package) use it, share it and re-use it. You have been doing it through React, but also, at the time of consuming `npm packages`: you import the entire package or part of it (x-function) and call it in as many places (aka, files) as necessary. And, if a new version is released, you just have to update the version of the packaging (having the possibility of anchor or lock to a particular version in case of issues related to compatibility).

At a "high-level" Module Systems are "rules" to define how we are going to "include" files in our project or application.

<!-- TODO:
Module Systems...
Differences, examples, encapsulation, dependency... revealing module pattern
-->

We have 3 main JS Module Systems: `CommonJS`, `AMD` and `ES2015 modules`.

**CommonJS**: require/exports (module.exports)
Sight: Server side development (Node´s default)
Behavior: sync > modules are loaded in the consigned order and at the particular moment (on the next example, on index.js, invert the order of the 2 first lines of code to illustrate the case). Remember, no import on-demand/async/runtime.
Result: `index.js | app.js | app.js > someFunction` Instead of: `app.js | index.js | app.js > someFunction`

Example:

index.js

```javascript
const app = require('./app.js');
console.log('index.js');

app.someFunction();
```

app.js

```javaScript
console.log('app.js');

// exports.fn is a shortcut of module.exports.fn
exports.someFunction = () => {
  console.log('app.js > someFunction');
};
```

**AMD: Async Module Definition**
Sight: Client side (browser)
Behavior: Async module loading.

Example:

index.js

```javaScript
console.log('index.js');

require(['./app'], function(someModule) {
  someModule.someFunction();
});
```

app.js

```javaScript
console.log('app.js');

define([], function() {
  return {
    someFunction: function() {
      console.log('app.js > someFunction');
    }
  };
});
```

Result: `index.js | app.js | app.js > someFunction`

**ES2015 modules** (also known as ECMAScript 6)
Sight: Standarization. Both client and server side.
Behavior: sync/async compatible.  
As we did with CommonJS invert the order of the 2 first lines of code: results don´t change since import is static and we cannot define freely where to call it.
`app.js | index.js | app.js > someFunction`

Example:

index.js

```javaScript
import * as app from './app';

console.log('index.js');

app.someFunction();
```

app.js

```javaScript
console.log('app.js');

export const someFunction = () => {
  console.log('app.js > someFunction');
};
```

---

<!--TODO:
Code spliting and how to load bundle dynamically
https://webpack.js.org/guides/code-splitting/

From Crate React App with a pre-set setup to our custom Webpack configuration
-->

<!-- TODO: Relocation of the next part -->

At this point, you should be familiar with `static imports` like `import { myFunction } from './helpers'`. However, a new async or dynamic way of importing ES modules is going to be available soon. Check [tc39 > proposal-dynamic-import
](https://github.com/tc39/proposal-dynamic-import).

Currently, we import all the required modules (at the top of our file), compile them and generate a bundle, without the possibility of loading a module on-demand (or dynamically), for example, when a user clicks on a button, when certain condition is met (like a change on a state property), etc.

Imagine if you were able to freely load modules at the runtime.

Example:

```javaScript
button.addEventListener('click', event => {
    e.preventDefault();
    import('./moreInformation.js')
    .then(moreInformation => {
        moreInformation.load();
    })
    .catch(error => {
        //...
    })
});
```

What happens behind the scenes is easy: we return a Promise that will be resolved on a certain time point, retrieving the module with its entire functionality.

---

Until now, our focus was only on the App (aka, our code)... `CRA` has been effectively in charge of the rest <!--TODO:; Extend what rest is --> A good way of having a "taste" of the big picture without compromising your current work, would be: create a new app with CRA, add one Component and eject your project: `npm run eject`

Here´s a screen capture comparing both `package.json`: before and after ejecting just to delight your own curiosity in case you decided to not eject a project.
![Redux DevTools Dispatching](/images/eject-comp.png)

However, the "biggest change" will be inside `config/` and `scripts/`
We are not analyzing the results of ejecting (just providing a high level illustration) but, opening the door to show you what are we going to do, which basically is, wire up what CRA was doing for us out-of-the-box.

We are going to start from scratch.
What we want...? Do what CRA does plus, add some extra functionality related to our needs. We will work with the example `[basic-redux-example[redux-thunk]`.

<!-- TODO:; what CRA is doing for us... Explain --->

```
mkdir nocra
cd nocra

npm init -y
```

Time to install the dependencies that we are using in our redux-thunk example:

```
npm install --save axios lodash react react-dom react-redux react-router-dom redux redux-thunk
```

We are going to move the following folders/ and files from `[basic-redux-example[redux-thunk]` to `nocra`

* public/
* src/
* .gitignore
* README.md

Now... Let´s install some dependencies:

* nodemon
* webpack
* babel-core
* babel-loader
* babel-plugin-async-to-promises
* babel-plugin-syntax-dynamic-import
* babel-plugin-transform-async-to-promises
* babel-plugin-transform-runtime
* babel-plugin-universal-import
* babel-polyfill
* babel-preset-env
* babel-preset-es2015
* babel-preset-react
* babel-preset-stage-2

```
npm install --save nodemon
```

```
npm install --save-dev webpack webpack-cli webpack-dev-server
```

```
npm install --save-dev @babel/core babel-loader babel-plugin-async-to-promises @babel/plugin-syntax-dynamic-import babel-plugin-transform-async-to-promises @babel/plugin-proposal-class-properties @babel/plugin-transform-runtime babel-plugin-universal-import @babel/polyfill @babel/preset-env @babel/preset-es2015 @babel/preset-react @babel/preset-stage-2
```

Now, in our package.json we are going to add the following script...

```
"scripts": {
  "start": "webpack-dev-server --config=config/webpack.config.js",
},
```

Create the folder `/config` at the root level and also the file `webpack.config.js`

```
mkdir config
cd config  
touch webpack.config.js
```

webpack.config.js

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../public'),
    //  publicPath: '/',
    filename: './bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
};
```

And create (as well) at the root level `.babelrc`

```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

Edit your public/index.html and add after your `<div id="root"></div>`

Now, let´s run our `webpack-dev-server`

```
npm start
```

The App should be rendering the list of comments. Make a change for example in `src/App.js`.
Webpack will re-compile (or re-generate) the bundle and reload our browser tab (through a `websocket` connection).

If you go to your DevConsole and open the Network tab, these request will appear:

![Webpack Network Requests](/images/webpack-network-requests.png)

The current size of our bundle.js is: 1.49 MB

Let´s go back to our package.json and add a build script

```
"build": "webpack --config=config/webpack.config.js"
```

Now, instead of running `npm start` execute `npm run build`.

1. We are running webpack instead of webpack-dev-server
2. bundle.js is about 1.16 MB (before, 1.49 MB). It is not excluding "dev" functionality since our config file has `mode: 'development'`
3. It will generate the bundle.js inside public/
4. You will access to static content: file:///C:/nocra/public/index.html

We will replace (on src/index.js) the route `<Route exact path="/" component={App} />` with `<App />`. We will come later and restore the routing; but, for the moment, we want to keep the focus on `Webpack`

Rename public/index.html to public/template.html

_Install_: html-webpack-plugin. It will automatically create an `index.html` (based on our template.html) and place the JS output (between <script>) on `public/`; in this case, `bundle.js`.

```
npm install --save-dev html-webpack-plugin
```

In your **webpack.config.js** add

```javascript
const HTMLWebpackPlugin = require('html-webpack-plugin');
```

And after `devServer`

```javascript
plugins: [
  new HTMLWebpackPlugin({
    template: './public/template.html'
  })
];
```

Before proceeding, let´s add another "entry point".

In webpack.config.js we are going to replace the value of entry with an object setting as many properties as entries we want.

```javascript
entry: {
  main: './src/index.js',
  other: './src/other.js'
},
```

And, in output, for filename property add the "[name] namespace" as we saw in our first example:

```javascript
filename: './[name]-bundle.js';
```

Now, create the file: /src/other.js

```javascript
console.log('I´m the other entry!');
```

Let´s try both:

* webpack-dev-server with npm start at http://localhost:8080/
* webpack with npm run build at file:///C:/nocra/public/index.html

Check the "outputs" or "built assets"

webpack-dev-server

```
Asset      Size  Chunks             Chunk Names
./main-bundle.js  1.49 MiB    main  [emitted]  main
./other-bundle.js   342 KiB   other  [emitted]  other
index.html  1.75 KiB          [emitted]
```

webpack

```
Asset      Size  Chunks             Chunk Names
./main-bundle.js  1.16 MiB    main  [emitted]  main
./other-bundle.js   3.8 KiB   other  [emitted]  other
index.html  1.75 KiB          [emitted]
```

BTW, if you are a fancy person and you want to see the same colorful output from `webpack-dev-server` when running `webpack`, add this property to the configuration file: **webpack.config.js**

```javascript
stats: {
  colors: true;
}
```

This new option should just be available for webpack (webpack-dev-server is doing by default). Something similar occurs for mode: webpack should take production and webpack-dev-server development.

The temptation of cloning the file and setting one for dev and other for prod could be big. But, there´s a much better way to do it and without duplicating code.

Install: webpack-merge
npm install --save-dev webpack-merge

Inside config/ create 2 new files

```
touch webpack.config.dev.js webpack.config.prod.js
```

Now, create the boilerplate for both files:

```javascript
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');

const config = {};

module.exports = merge(commonConfig, config);
```

In **webpack.config.dev.js** we are going to add (inside config)

```javascript
mode: 'development',
devServer: {
  contentBase: '../public'
}
```

In **webpack.config.prod.js** we are going to add

```javascript
  stats: {
    colors: true
    },
  mode: 'production'
```

On package.json we are going to update our scripts:

```json
"scripts": {
  "start": "webpack-dev-server --config config/webpack.config.dev.js",
  "build": "webpack --config config/webpack.config.prod.js"
},
```

And finally, on webpack.config.js we are going to remove (or comment)

```javascript
  stats: {
    colors: true
    },
  mode: 'development'
```

Now, run both commands (scripts) again.
Everything should be working... And it should be working as before. However, if you compare the ouput (size of the bundled files)

```
./mainbundle.js > Now: 155 KB - Before: 1.16 MiB  
./otherbundle.js > Now: 969 bytes - Before: 3.8 KiB
```

... and, if you check the files, you will see that files were optimized for production: replacing some namespaces, minifying the code...

With the pass of the time, and after adding and removing several "entry points" you could have your public/ folder full of old and un-used bundles (aka, files).
So, we are going to do the following: every time we build our project, we are going to delete ALL the files inside the dir public/ (also, if you have the folders dist/ and build/) excluding x-files. In our case, we want to preserver: template.html, manifest.json and favicon.ico.

Install: clean-webpack-plugin

```
npm install --save-dev clean-webpack-plugin
```

Add a couple of dummy files to your public/

```
touch public/hello.js public/hello.html public/hello.h public/hi.js
```

On webpack.config.prod.js, add...

Outside the config object

```javascript
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let pathsToClean = ['dist/', 'build/', 'public/'];

let cleanOptions = {
  root: path.resolve(__dirname, '../'),
  exclude: ['template.html', 'manifest.json', 'favicon.ico'],
  verbose: true,
  dry: false
};
```

Inside our config/

```javascript
plugins: [new CleanWebpackPlugin(pathsToClean, cleanOptions)];
```

And execute: `npm run build`
_Note: It could take some time._

The output will start with...

```
clean-webpack-plugin: C:\practice\nocra\dist has been removed.
clean-webpack-plugin: C:\practice\nocra\build has been removed.
clean-webpack-plugin: C:\practice\nocra\public has been removed.
clean-webpack-plugin: 3 file(s) excluded - favicon.ico, manifest.json, template.html
```

And as you can see, all the dummy files were removed. Also, our bundles (\*.js) which were deleted (by clean-webpack-plugin) and re-generated (by webpack).

Let´s continue installing dependencies. Testing time:

* jest
* enzyme
* enzyme-adapter-react-16
* enzyme-to-json
* babel-jest
* identity-obj-proxy
* react-test-renderer
* regenerator-runtime
* jest-cli

```
npm install --save-dev jest enzyme enzyme-adapter-react-16 enzyme-to-json babel-jest identity-obj-proxy react-test-renderer regenerator-runtime jest-cli
```

Create src/tempPolyfills.js

```javascript
const requestAnimationFrame = (global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
});
export default requestAnimationFrame;
```

Create src/setupTests.js

```javascript
import requestAnimationFrame from './tempPolyfills';

import { configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter(), disableLifecycleMethods: true });
```

Note: We saw some of these configurations on `unit-tests` section. However, here, we will wire up the minimum just as proof of concept.

Then, in package.json we will add a new script...

```json
"test": "jest"
```

... and also, `jest` configuration...

```json
"jest": {
  "collectCoverageFrom": ["src/**/*.{js,jsx,mjs}", "!**/node_modules/**"],
  "moduleNameMapper": {
    "\\.css$": "identity-obj-proxy"
  },
  "transform": {
    "^.+\\.(js|jsx|mjs)$": "<rootDir>/node_modules/babel-jest"
  },
  "coverageReporters": ["text-summary"],
  "setupFiles": ["<rootDir>/src/setupTests.js"]
}
```

Create a simple component (we don´t care about testing in this particular moment, if not, Jest and Enzyme functionalities)

src/Intro.js

```javascript
import React, { Component } from 'react';

const Intro = () => {
  return <div>Intro</div>;
};

export default Intro;
```

... and its Unit Test: src/Intro.test.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import Intro from './Intro';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Intro />, div);
});
```

This is the basic test that `CRA` generates for the main component.

Execute the test script: `npm run test`

And you will receive the following error:

```
> nocra@1.0.0 test C:\practice\nocra
> jest

FAIL src/Intro.test.js
  ● Test suite failed to run

    Cannot find module 'babel-core'

      at _load_babelCore (node_modules/babel-jest/build/index.js:32:24)

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        1.246s
Ran all test suites.
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! nocra@1.0.0 test: `jest`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the nocra@1.0.0 test script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
```

If you are thinking... But... We have babel-core installed... Check again your package.json.
We have `@babel/core`: https://www.npmjs.com/package/@babel/core
And jest is requiring `babel-core`: https://www.npmjs.com/package/babel-core

Execute the following command to dispel any doubt:

```
npm ls babel-core
```

Result:

```
nocra@1.0.0 C:\nocra
`-- jest@23.6.0
  `-- jest-cli@23.6.0
    `-- jest-runtime@23.6.0
      `-- babel-core@6.26.3
```

Add to your `package.json`, after `@babel/core`

```json
"babel-core": "7.0.0-bridge.0"
```

Then, run: `npm install`

Now, run again the test script: `npm run test`

Result:

```
> nocra@1.0.0 test C:\practice\nocra
> jest

PASS src/Intro.test.js
  √ renders without crashing (13ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.9s
```

Now, let´s reformat our UT with Enzyme: Intro.test.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Intro from './Intro';

describe('<Intro />', () => {
  const wrapper = shallow(<Intro />);

  it('matches the previous Snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('has a h1 as title with class title', () => {
    expect(wrapper.find('h1').exists()).toBe(true);
  });
});
```

Execute the tests: `npm run test`

Result:

```
> nocra@1.0.0 test C:\practice\nocra
> jest

FAIL src/Intro.test.js
  <Intro />
    √ matches the previous Snapshot (7ms)
    × has a h1 as title with class title (9ms)

  ● <Intro /> › has a h1 as title with class title

    expect(received).toBe(expected) // Object.is equality

    Expected: true
    Received: false

      22 |   });
      23 |   it('has a h1 as title with class title', () => {
    > 24 |     expect(wrapper.find('h1').exists()).toBe(true);
         |                                         ^
      25 |   });
      26 | });
      27 |

      at Object.toBe (src/Intro.test.js:24:41)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 passed, 2 total
Snapshots:   1 passed, 1 total
Time:        1.842s, estimated 2s
```

One of our tests is failing. Add the following to `Intro.js`

```html
<h1>Hello</h1>
```

Run the test script again...

Result:

```
× matches the previous Snapshot (16ms)
√ has a h1 as title with class title (4ms)
```

Time to refactor.
First, inside `config` we are going to create a new folder: `config/jest`.
Move the following files inside config/jest

* src\setupTests.js
* src\tempPolyfills.js

And inside our main package.json, replace...

```json
"setupFiles": ["<rootDir>/src/setupTests.js"]
```

with...

```json
"setupFiles": ["<rootDir>/config/jest/setupTests.js"]
```

Execute `npm test` or `npm run test`

We should see the same as before:
![Missing CSS loader](/images/jest-basic.png)

Create the file `config/jest/jest.config.json`

```
touch config/jest/jest.config.json
```

Also, we are going to move the jest´s configuration that we have in `src/package.json` to `config/jest/jest.config.json`.

```json
{
  "verbose": true,
  "collectCoverageFrom": [
    "<rootDir>/src/**/*.{js,jsx,mjs}",
    "!**/node_modules/**"
  ],
  "moduleNameMapper": {
    "\\.css$": "identity-obj-proxy"
  },
  "transform": {
    "^.+\\.(js|jsx|mjs)$": "<rootDir>/node_modules/babel-jest"
  },
  "setupFiles": ["<rootDir>/config/jest/setupTests.js"]
}
```

Notes:
We are...

1. Removing the `jest` property.
2. Changing the first element of the array-value of `collectCoverageFrom`
3. Adding the `verbose` property.
4. Removing `"coverageReporters": ["text-summary"]`

Inside our package.json we are going to change our test script (currently, `"test": "jest"`)

```json
"test": "jest --env=jsdom --watchAll --colors --config=config/jest/jest.config.json  --rootDir",
```

Quick comment: `--rootDir` flag will point to `.`

Now, we can try (first)

**npm test**

![npm test](/images/npm-test.png)

... then...

**npm test -- --coverage**

![npm --coverage](/images/npm-coverage.png)

This will show you a table with the "testing coverage" of your tests.

Note: If you are under Windows OS, use the CMD or PowerShell to avoid any kind of issue.

<!-- TODO: Add Jest and Enzyme and wire them up... Make the watch and input possible, ect -->

<!-- TODO: Loaders for HTML and images -->

<!-- TODO:  Ver si necesito @babel/plugin-transform-arrow-functions: probar en viejo IE -->

Our app works properly in Chrome and Firefox, but... If you try IE, you will see a blank page, and, if you go to the console, the following error will grab your attention:

```
var promise = Promise.resolve(config);
'Promise' is undefined
this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
```

**How we fix this...?**

1. We have installed the plugin to transpile promises: `babel-plugin-async-to-promises`
2. We have installed `babel-polyfill` to make IE "understand promises"
3. We also have installed `@babel/preset-env`

So, in our main file (or top entry point) we are going to add
src/index.js

```javascript
import '@babel/polyfill';
```

And inside our package.json

```json
  "browserslist": ["last 1 version", "> 1%", "IE 11", "IE 10", "IE 9"]
```

Refresh your browser... Great! Now we even support IE9!

<!-- TODO: Better title and intro -->

Server Part

Let´s create the folder server

```
mkdir server && cd server
```

Init the server project and install express (plus body-parser)

```
npm init - y
npm install express body-parser
```

Create the main server file: sever/index.js

```javascript
const express = require('express');

const bodyParser = require('body-parser');

class RouterAndMiddlewares {
  constructor() {
    this.app = express();
    this.initExpress();
    this.middlewaresExpress();
    this.initControllers();
    this.start();
  }

  initExpress() {
    this.app.set('port', 8080);
  }

  middlewaresExpress() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }

  initControllers() {
    require('./BasicController.js')(this.app);
  }
  start() {
    let self = this;
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server Listening for port: ${self.app.get('port')}`);
    });
  }
}

new RouterAndMiddlewares();
```

Create file server/BasicController.js

```

```

In our main package.json, src/package.json add a new script:

```
"dev": "node src/server/index.js"
```

We are going to install the following middle-wares:

<!--TODO explain why -->

src/

1. webpack-dev-middleware
2. webpack-hot-middleware

server/

```
npm install webpack-dev-middleware webpack-hot-middleware --save-dev
```

Now, we are going to wire up webpack, these middle-wares and the express.static built-in middleware function in Express which will tell Express from where we want to serve our static content.

server/index.js with new changes

```javascript
const express = require('express');

const bodyParser = require('body-parser');

const webpack = require('webpack');
const config = require('../config/webpack.config.dev.js');
const compiler = webpack(config);

const webpackDevMiddleware = require('webpack-dev-middleware')(
  compiler,
  config.devServer
);

const webpackHotMiddlware = require('webpack-hot-middleware')(
  compiler,
  config.devServer
);

class RouterAndMiddlewares {
  constructor() {
    this.app = express();
    this.initExpress();
    this.middlewaresExpress();
    this.initControllers();
    this.start();
  }

  initExpress() {
    this.app.set('port', 8080);
  }

  middlewaresExpress() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    this.app.use(webpackDevMiddleware);
    this.app.use(webpackHotMiddlware);

    const staticMiddleware = express.static('public');
    this.app.use(staticMiddleware);
  }

  initControllers() {
    require('./BasicController.js')(this.app);
  }
  start() {
    let self = this;
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server Listening for port: ${self.app.get('port')}`);
    });
  }
}

new RouterAndMiddlewares();
```

Execute `npm run dev` and go to http://localhost:8080/

If we make a change, for example, in src/App.js we modify the h1 text, webpack will re-compile...

![webpack-dev-middleware re-compiling](/images/webpackDevMiddleware-reCompiles-express.png)

However, we lost the socket connection and in consequence, the "hot reloading feature". Every time that you make a change, YOU have to reload the browser-tab manually.
This is ok, but, impractical. So, let´s add hot-reloading through `webpack-hot-middleware`

In webpack.config.dev.js add at the top (aka, require webpack)

```javascript
const webpack = require('webpack');
```

Then add to the devServer property:

```javascript
devServer: {
  contentBase: '/..public',
  hot: true,
  overlay: true
},
```

Then add plugins:

```javascript
plugins: [new webpack.HotModuleReplacementPlugin()];
```

Next, in our main client file, in our case **src/index.js** add at the top:

```javascript
require('webpack-hot-middleware/client?reload=true');
```

Run: `npm run dev`

You will see in the browser´s console:

```
[HMR] connected | client.js:88:22
[HMR] Checking for updates on the server... | process-update.js:39:22
```

Make a change, for example, on the text of the H1 tag that we have in `src/App.js`

Now, you will see in the browser´s console:

```
[HMR] bundle rebuilding | client.js:230:9
[HMR] bundle rebuilt in 242ms | client.js:238:9
[HMR] Checking for updates on the server... | process-update.js:39:22
```

And see, as well, your change on screen.

This works well as proof ocf concept. However, if you try to execute `npm run build` and load your built project you will see the following errors and a white page:

```
Firefox can’t establish a connection to the server at file:///__webpack_hmr. main-bundle.js:6:22162
Error: [HMR] Hot Module Replacement is disabled. main-bundle.js:6:35349
Firefox can’t establish a connection to the server at file:///__webpack_hmr. main-bundle.js:6:22162
```

To fix this, we are going to REMOVE `require('webpack-hot-middleware/client?reload=true');` from `src/index.js` and overwrite our main entry point in `webpack.config.dev.js`

```javascript
entry: {
  main: ['webpack-hot-middleware/client?reload=true', './src/index.js']
},
```

Now, everything should be working properly.

We didn´t deal with CSS yet. So, create the file src/App.css

```css
h1 {
  font-size: 20px;
}
```

And then, import it into src/App.js

```javascript
import './App.css';
```

You should see the following error (in both, console and screen and in your Node console if you are building your project with `npm run build`).

![Missing CSS loadeR](/images/missing-css-loader.png)

The message is pretty clear: webpack needs the proper loader to process other files than \*.js.
Let´s install:

* style loader
* css-loader

```
npm install --save-dev css-loader style-loader
```

And, in `webpack.config.js` add a new rule:

```javascript
{
  test: /\.css$/,
  use: [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      query: {
        modules: true,
        localIdentName: '[name]__[local]__[hash:base64:5]'
      }
    }
  ]
}
```

Note: `modules: true` enables `CSS modules` while `localIdentName` configures the generated ident (example: `App__rPi__3Noxh`; the hash "3Noxh", will be particular useful for caching purposes once we are in a `prod env`)

Go to http://localhost:8080/ and you should see everything working as expected.

Create a new css file, `src/index.css` with any rule you want and import it into `src/index.js`

_Short explanation:_ When `css-loader` grabs all the local-imported \*.css files (like App.css, index.css) `style-loader` add those rules within `<style>`.
Remember that webpack executes from right to left.

In our example, if you inspect the markup you should see...

```html
<style type="text/css">h1 {
  font-size: 20px;
}
</style>
<style type="text/css">div {
  margin: 20px;
}
</style>
```

One rule is coming from `src/App.css`, the other from `src/index.css`.

We can (also) start using `in-line styling`, `CSS modules` and/or `CSS in JS`

`in-line styling` example:

```javascript
<h1 style={{ textDecoration: 'underline' }}>List of comments 101</h1>
```

`CSS modules` example:

In `src/App.css` add the rule

```
.rPi {
  border: 1px solid black;
}
```

Then in `src/App.js`

* Import all the styles: `import styles from './App.css';`
* Apply the style to the particular element: `<img src={rPI} alt="Rasp. Pi Logo" className={styles.rPi} />`

`CSS in JS` example:

Create the file `src/App.css.js`

```javascript
const settings = {
  color: 'white'
};

const sectionTitle = {
  color: settings.color,
  backgroundColor: 'grey',
  padding: '20px'
};

export default { sectionTitle };
```

Then in `src/App.js` we are going to add the following variable

* Import: `import cssInJs from './App.css.js';`
* Add the style tag: `<h1 style={cssInJs.sectionTitle}>List of comments 101</h1>`

Time for handling images.
Let´s create a new dir `src/images/` and add any image. In my case, `rPI-400x400.jpg`.
Now, let´s import that image in our `src/App.js`

```javascript
import rPI from './images/rPI-400x400.jpg';
```

We receive an error similar to the previous one:

```html
ERROR in ./src/images/rPI-400x400.jpg 1:0 Module parse failed: Unexpected character '�' (1:0) You may need an appropriate loader to handle this file type. (Source code omitted for this binary file)
```

And yes, it ´s indeed related to a missing loader.

For this, we are going to install file-loader

```
npm install --save-dev file-loader
```

And add the proper rule inside webpack.config.js

```javascript
{
  test: /\.jpg$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'images/[name].[ext]'
      }
    }
  ]
}
```

If you want to support multiple file ext (or types) you can use:

```javascript
test: /\.(png|jpg|gif)$/,
```

It should work properly, but... We are not rendering the image.
Add to `src/App.js`.

```javascript
<img src={rPI} alt="Rasp. Pi Logo" />
```

Congratulations! You can check another important topic in your list of TODO!

---

---

From a Client Side Rendering (Traditional React App) to Server Side rendering
