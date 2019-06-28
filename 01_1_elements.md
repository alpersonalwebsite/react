## React Elements

**createElement()**

Returns a JavaScript object
It takes 3 arguments:

1. element
2. attributes
3. content or element´s children

Example:

```javascript
const element = React.createElement(
  'div',
  null,
  React.createElement('strong', null, 'Hello world!')
);
```

*Note:* We can pass multiple parameters as the last argument. Behind the scenes, `React` will "wrap them" in an array. 

Example: 
```javascript
...   
React.createElement('div', null, 'Hello world!', ' More 1...', ' More 2...') 
...
```

In our examples, if we log `element` we will have one case where the value of the key `children` will be a `string` and the other an `array of strings`

```javascript
props:
  children: "Hello world!"

props:
  children: (3) ["Hello world!", " More 1...", " More 2..."]
```

Alternatively, we can pass an `object` as the *second argument* containing: `attributes` and the own `content` as the `value` of the children's key.
Example:
```javascript
const element = React.createElement(
  'div',
  null,
  React.createElement('div', { role: 'contentinfo', className: 'this-is-a-div', children: ['Hi',' Hola'] })
);
```

**ReactDOM.render()**

Let´s first `render` our previous element.

```javascript
const element = React.createElement(
  'div',
  null,
  React.createElement('strong', null, 'Hello world!')
);

ReactDOM.render(element, document.getElementById('root'));
```

If we inspect our `html` we will see our DOM node...

```html
<body>
  <div id="root">
  <div><strong>Hello world!</strong></div>
  </div>
</body>
```

Another example (with `components` not elements)

Example: `src/index.js`

```javascript
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
```

*Note:* Remember `React Apps` **usually** have a `single root element`.

File: `public/index.html`

```html
<div id="root"></div>
```

### Elements

As we saw previously, we create elements through `React.createElement()`.
An element is an object that describes what we want to show in the screen.
Well, it is (in fact) an object representation of a DOM node.

```javascript
const element = <div>Im an element!</div>;
```

Through components (we will cover this on the next chapter) we return the created elements. Let´s go back to our `Hello world!` example...

```javascript
const element = React.createElement(
  'div',
  null,
  React.createElement('strong', null, 'Hello world!')
);

HelloWorld = () => element;

ReactDOM.render(<HelloWorld />, document.getElementById('root'));
```
