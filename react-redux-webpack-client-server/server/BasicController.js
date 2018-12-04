require('dotenv').config();
const isHtmlWebpackPlugin = process.env.WEBPACK_STATIC_HTML_BUILD;
console.log(isHtmlWebpackPlugin);

class BasicController {
  constructor(app) {
    this.app = app;
    this.allRoutes();
  }

  allRoutes() {
    if (isHtmlWebpackPlugin != 'true') {
      this.app.get('*', (req, res) => {
        res.send(`
       <html>
         <body>
           <div>Hello</div>
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
