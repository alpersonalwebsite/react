## Unit Tests

I recommend you to follow the TDD (Test Driven Development)
You start writing the boiler-plate of your Unit Test, then you run the test which will fail and it will determine the feature that you should add to your script/program... and so on.

When you use create-react-app you are wiring up -as well- Jest (Facebook).
Your files should have the extension \*.test.js or be inside \_\_tests\_\_

In our examples we will use -also- Enzyme (Airbnb).

First, install enzyme and the proper adapter

CMD or terminal:

```
npm install enzyme enzyme-adapter-react-16 jest-cli@20.0.4 --save-dev  
```

Yes... We are saving it as a dev dependency. So, if you go to your package.json you will see something like:

```
"devDependencies": {
  "enzyme": "^3.3.0",
  "enzyme-adapter-react-16": "^1.1.1",
  "jest-cli": "^20.0.4"
}
```

Note: At the moment I´m writing this tuto the last Jest version is 23.4.1, however, react-scripts is locked at 20.0.4 so other will not work.

We are going to create **src/tempPolyfills.js**

```
const requestAnimationFrame = global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
}
export default requestAnimationFrame;
```

And, **src/setupTests.js**

```
import requestAnimationFrame from './tempPolyfills';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter(), disableLifecycleMethods: true });
```

### Snapshots

Snapshots are a recorded history of our Component to verify that previous "captures" match current ones after changes (so, we prevent unwanted changes).

Create the file src/App.test.js (if you have it, delete ALL its content)

```
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import App from './App';

describe('<App />', () => {
  const wrapper = mount(<App />);

  it('matches the previous Snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
```

And... Run your tests...

```
npm test
```

You can also use yarn (yarn test)

The result will be...
![Unit Test: Snapshot](/images/unit-test-snapshot.png)

You will see in your root dir, in our case, src a new folder **\_\_snapshots\_\_**
If you are going to be working with several people, exclude this folder from Git. In this case, add the following rule to your **.gitignore**

```
# testing
**/__snapshots__
```

Feel free to check the strcuture of your Snapshot. Go to **src/\_\_snapshots/App.test.js.snap**

Now, make a small change in your App Component. Just add a comment inside your class.

### Coverage

### Mock
