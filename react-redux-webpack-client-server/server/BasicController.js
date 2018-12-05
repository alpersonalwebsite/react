require('dotenv').config();
const isHtmlWebpackPlugin = process.env.WEBPACK_STATIC_HTML_BUILD;

const React = require('react');
const renderToString = require('react-dom/server').renderToString;
const TestingSSR = require('../src/TestingSSR').default;

class BasicController {
  constructor(app) {
    this.app = app;
    this.allRoutes();
  }

  allRoutes() {
    if (isHtmlWebpackPlugin != 'true') {
      /*
      this.app.get('*', (req, res) => {
        res.send(`
       <html>
         <body>
         <div id="root">${renderToString(<TestingSSR />)}</div>
         <script src='vendors~main-bundle.js'></script>
         <script src='main-bundle.js'></script>
         </body>
       </html>
     `);
      });
      */
      this.app.get('*', (req, res) => {
        res.send(`
 <html>
   <body>
     <div id="root">Hello 1</div>
     <script>console.log(1111111)</script>
   </body>
 </html>
`);
      });
    }
  }
}

module.exports = app => {
  return new BasicController(app);
};
