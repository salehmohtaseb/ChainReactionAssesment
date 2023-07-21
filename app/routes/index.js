module.exports = app => {
  var router = require("express").Router();

  require('./auth.routes')(router, app)
  require('./posts.routes')(router, app)
};
