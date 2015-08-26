'use strict';

var routes = require('./routes');

exports.register = function(server, options, next) {

  server.route(routes);

  next();

};

exports.register.attributes = {
  pkg: require('./package.json')
};