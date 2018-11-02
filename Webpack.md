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

module.exports.someFunction = function() {
  console.log('app.js > someFunction');
};
```

other.js

```javaScript
console.log('other.js');
```

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
