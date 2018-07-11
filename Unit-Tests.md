## Unit Tests

I recommend you to follow the TDD (Test Driven Development)
You start writing the boiler-plate of your Unit Test, then you run the test which will fail and it will determine the feature that you should add to your script/program... and so on.

When you use create-react-app you are wiring up -as well- Jest (Facebook).
Your files should have the extension \*.test.js or be inside \_\_tests\_\_

In our examples we will use -also- Enzyme (Airbnb).

First, install the adapter

CMD or terminal:

```
npm install enzyme-adapter-react-16 --save-dev  
```

Yes... We are saving it as a dev dependency. So, if you go to your package.json you will see something like:

```
"devDependencies": {
  "enzyme-adapter-react-16": "^1.1.1"
}
```

### Snapshots

Snapshots are a recorded history of our code to verify that previous "captures" match current ones after changes (so, we prevent unwanted changes).

### Coverage

### Mock
