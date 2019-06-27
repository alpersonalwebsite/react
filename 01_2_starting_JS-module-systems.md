## JS Module Systems

We are going to review `Modules Systems` in deep in a future lesson, however, if you are totally new to `Node.js` and `JS` in general... Having a vague idea of what´re we doing with "import/export" will make things easier.

So... Let´s forget about `React` for a moment and create some `vanilla JS` files:

**/test/model.js**

```javascript
const data = {
  name: 'Peter',
  lastName: 'Pan',
  age: 33,
  hobbies: ['fly', 'play', 'eat']
};
export default data;
```

**/test/controller.js**

```javascript
export const sayHi = (name) => {
  return 'Hi... My name is ' + name;
}

export const showHobbies = (hobbies) => {
  return 'Hi... My name is ' + hobbies;
}
```

**/test/render.js**

```javascript
import data from './model';

import { sayHi, showHobbies } from './controller';

console.log(sayHi(data.name));
```

**Do you understand what´s going on here...?** If so, feel free to move to the next lesson. If not, let´s think together.

You can see that we are separating concerns or "parts" of our code:
1. *Model* holds the data
2. *Controller* all the logic
3. *Render* the rendering part

This makes your code modular, understandable and easy to update and reuse.

You can see that we have the following pipeline: `render` imports both, data and functionality and it renders through the functionality or logic (aka, `controller`) the formatted piece of `data`. We can say there isn´t a strict relation between data and render if not, a connection between some kind of middleware interpreted by controller. Don´t worry! We will come back to this.

If you try to execute our tiny app with `node render`, you will be prompted with the following error:

```console
$ node render
C:\test\render.js:1
(function (exports, require, module, __filename, __dirname) { import data from '
./model';
                                                              ^^^^^^
```

**What´s going on...?** Node uses `CommonJS` but we are utilizing `ES2015 modules` to "deal with our modules" (files).

There are several ways of solving this issue. Since we will resume this topic at future, I´m picking the easiest one: `esm`

1. Let´s init our project: `npm init -y`
2. Install `esm`: `npm install --save esm`
3. Create a new file as the `entrypoint` of our app. Example: `index.js`
4. Add the following content to `index.js`

```JavaScript
require = require("esm")(module/*, options*/)
module.exports = require("./render.js")
```
From now on, all the files linked directly or indirectly to the main file of our App, in our case, `render.js` will support `ES2015 modules`. And, you can still use `require()` if you want.

Now, execute in your terminal: `node index` and you will receive the output:
```
Hi... My name is Peter
```

Great job! One more thing...
You can see that we are exporting...
1. Model: `export default data;`
2. Controller: `export const sayHi = (name) => {...}`

**Why are we doing this...?**
Basically, with `export default` we can import what we are exporting in x-file (example: model.js) in the following way: `import data from './model';`
If you remove the keyword default and export with this syntax: `export const data = {...}` as we are doing in controller.js, you will have to change the way that you import data or will receive an error like:
```
SyntaxError: The requested module 'file:///C:/test/model.js' does not provide a
n export named 'default'
```

You can destructure as we did with `{ sayHi, showHobbies }` resulting in `import { data } from './model';`

So, technically there are 2 ways of exporting...
1. `Default export` which allows you to set any placeholder. For example, we `export default data` and import like this: `import whatever from './model';`

2. Name export where you import by the name of the variable. In this case, if we `export sayHi` and we want to change the placeholder, we have to do...
a. `import { sayHi as otherThing } from './controller';`
Here you will call the function `otherThing()`.
b. `import * as functions from './controller';`
Here you will call the method of functions as `functions.sayHi()`.
