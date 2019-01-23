**Coercion**

Is when we force one data type into another. This is because JS is pretty flexible handling data types.

Example:

```javascript
console.log(1 + true);
console.log('1' + 1);
```

We force or coerce true into 1 and 1 int/number into 1 string

The following operators convert data types values into `numbers`: `- * / %`
However, `+` as we saw, converts by default into a `string`.

```javascript
console.log('1' + 1);
console.log('1' - 1);
```

Result:
11
0
