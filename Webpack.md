## Webpack

Quoting Webpack documentation, "webpack is a static module bundler for modern JavaScript applications".
It takes all the files (let´s just care, at least for the moment, only about `\*.js` and `\*.css`) that are wired up in our project and generates a bundle.

As always, let´s use an example to illustrate the statement.

Create a new folder

```
mkdir webpack
cd webpack
```

Initiate our project (default flag)

```
npm init -y
```

Install webpack and webpack-cli

```
npm install --save-dev webpack webpack-cli
```

Edit your package.json and add the following script:

```
  "build": "webpack --config=webpack.config.js"
```

Create the file webpack.config.js

```
touch webpack.config.js
```

webpack.config.js

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

Create the folder dist

```
mkdir dist
```

Inside dist create the file index.html

```
touch index.html
```

index.html

```html
<body>
    <h1>Testing Webpack...!</h1>
    <script src="bundle.js"></script>
</body>
```

Create the folder src

```
mkdir src
```

Inside src create the files app.js, index.js and other.js

```
touch app.js index.js other.js
```

index.js

```javaScript
import App, { someFunction } from './app';

console.log('index.js');

someFunction();
```

app.js

```javaScript
console.log('app.js');

module.exports.someFunction = () => {
  console.log('app.js > someFunction');
};
```

other.js

```javaScript
console.log('other.js');
```

Inside your root directory, **webpack**, run

```
npm run build
```

You will see something like...

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

Open your **index.html** and check the console. You should see:

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
Even when this configuration is probably the most basic one, you can start seeing the power and flexibility of webpack. Also, its discretion... Everything outside the entry points that´s not indexed as part of the project, will not be part of the output.

---

<!-- TODO:
Module Systems...
Differences, examples, encapsulation, dependency... revealing module pattern
-->

**CommonJS**: require/exports
Sight: Server side development.
Behavior: sync > modules are loaded in the consigned order and at the particular moment (on the next example > index.js, invert the order of the 2 first lines of code to illustrate the case).
`index.js | app.js | app.js > someFunction`

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

exports.someFunction = () => {
  console.log('app.js > someFunction');
};
```

<!-- TODO:
Excluding for the moment AMD
**AMD (Asynchronous Module Definition)**
The "evolution" of CommonJS: async module loading.
-->

**ES2015 modules** (also known as ECMAScript 6)
Sight: Standarization.
Behavior: sync/async compatible.  
As we did with CommonJS invert the order of the 2 first lines of code: results don´t change since import is static and we cannot define freely where to call it.
`app.js | index.js | app.js > someFunction`

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
What is
What´s a bundle.
Others like Webpack >  Browserify

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
