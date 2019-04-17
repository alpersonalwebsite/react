To relocate...

## Layouts

When you are creating an application, you could have some components that are going to be present in all the screens. For example: Header, Footer, Sidebar... Until now, we have been importing components into a main one. Even when this works (mostly for small apps) it does not scale.
Think about this scenario:
You have a main file where you are rendering your app into an HTML node and inside it using the Provider tag for setting your redux or global store, handling the routes and in relation to x-route a particular screen or page.
You do also have the `Header and Footer components` and the following screens or `pages: Home, Hello, About, Contact`.

1. How would you define the skeleton of your App...?
   If you follow previous use cases and guidelines, you will be tempted to do...

```
/src
  /components
    /About.js
    /Contact.js
    /Header.js
    /Hello.js
    /Home.js
    /Footer.js
  /index.js
```

Even when all are "React components" their intention is extensively different: we have regular re-usable components and pages or screens.

In this sense, a better (and clearer) approach would be...

```
/src
  /components
    /Header.js
    /Footer.js
  /pages
    /About.js
    /Contact.js
    /Hello.js
    /Home.js
  /index.js
```

2. How should we reuse (include or consume) the Header and Footer components...? As before, perhaps, you are thinking in import on each component (like About), both, Header and Footer. This would work but we would be duplicating code and adding pollution to our code base.
   So... Why not creating some kind of wrapper where we include those components to re-utilize and receive whatever (aka, Component) our routes define.

Our skeleton...

```
/src
  /components
    /Header.js
    /Footer.js
  /layouts
    /index.js
  /pages
    /About.js
    /Contact.js
    /Hello.js
    /Home.js
  /index.js
```

You can see the full example on examples/[basic-react-redux-client-app]
Anyway, I will add the main parts of the needed code and files to highlight the layout´s implementation.

src/index.js

```javaScript
import App from './App';
import About from './pages/About';
import Layout from './layouts';

...
...
...

ReactDOM.render(
  <Layout>
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/about" component={About} />
        </div>
      </BrowserRouter>
    </Provider>
  </Layout>,
  document.getElementById('root')
);
```

src/components/Header.js

```javaScript
import React from 'react';

const Header = () => {
  const styles = {
    background: 'black',
    color: 'white',
    textAlign: 'center'
  };
  return (
    <div style={styles}>
      <h1>Header</h1>
    </div>
  );
};

export default Header;
```

src/layouts/index.js
I´m using a class component since I´ll be adding logic and some life cycles hooks/methods.

```javaScript
import Header from '../components/Header';
import React, { Component } from 'react';

class Layout extends Component {
  render() {
    console.log(this.props.children);
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}
export default Layout;
```

src/pages/About.js

```javaScript
import React from 'react';

const About = () => {
  return (
    <div>
      <h2>This is About Screen</h2>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non
        feugiat diam. Maecenas sed felis convallis, ornare velit a, mattis ante.
        Donec non ex ut mi efficitur euismod.
      </div>
    </div>
  );
};

export default About;
```

Now, run you project and go to http://localhost:3000/about
