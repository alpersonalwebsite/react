// A stub for image imports under jest.
//
// `identity-obj-proxy` is the right mapper for CSS MODULES, where the import is an
// object and every property access should return its own key. It is the wrong one
// for an image, because the import is used as a value: `<img src={rPI} />`. React
// then tries to set a Proxy as a DOM attribute and throws
// `TypeError: symbol is not a function` from setValueForProperty, which is a
// genuinely baffling error to arrive at from `import rPI from './images/x.jpg'`.
//
// A plain string is what webpack's file-loader would have produced, so that is
// what this returns.
module.exports = 'test-file-stub';
