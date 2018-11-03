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

So... We have a configuration file, webpack.config.js, where we are defining our entry point, or the file which will wire (directly or indirectly) the other ones for the bundle. In our example, the output (bundle.js) contains the code of the entry or main file index.js and also app.js which is imported on index.js. However, we have the file other.js which was not included since it´s not part of the "cabling". As soon as we wire it up to index.js or app.js, it will be included in our bundle.

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

Open the `other.js` file.
Remember that in our webpack configuration file we set the flag development...? Well, change it to production: `mode: 'production',`.

Build the project again.

Go to `other.js`.
Yes... Webpack is concatenating, minifying and just bundling the code needed for production.

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
