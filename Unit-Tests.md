## Unit Tests

I recommend you to follow the TDD (Test Driven Development)
You start writing the boiler-plate of your Unit Test, then you run the test which will fail and it will determine the feature that you should add to your script/program... and so on.

When you use create-react-app you are wiring up -as well- Jest (Facebook).
Your files should have the extension \*.test.js or be inside \_\_tests\_\_

In our examples we will use -also- Enzyme (Airbnb).

First, install enzyme and the proper adapter

CMD or terminal:

```
npm install enzyme enzyme-adapter-react-16 jest-cli --save-dev  
```

Yes... We are saving it as a dev dependency. So, if you go to your package.json you will see something like:

```
"devDependencies": {
  "enzyme": "^3.3.0",
  "enzyme-adapter-react-16": "^1.1.1",
  "jest-cli": "^23.4.0"
}
```

In your package.json, change...

```
"test": "react-scripts test --env=jsdom",
```

with...

```
"test": "react-scripts test --env=jsdom --watchAll"
```

Then we are going to create **tempPolyfills.js**

```
const requestAnimationFrame = global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
}
export default requestAnimationFrame;
```

And, **setupTests.js**

```
import requestAnimationFrame from './tempPolyfills';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter(), disableLifecycleMethods: true });
```

### Snapshots

Snapshots are a recorded history of our code to verify that previous "captures" match current ones after changes (so, we prevent unwanted changes).

Create the file src/App.test.js (if you have it, delete ALL its content)

### Coverage

### Mock
