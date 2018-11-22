class BasicController {
  constructor(app) {
    this.app = app;
  }
}

module.exports = app => {
  return new BasicController(app);
};
