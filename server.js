'use strict'

var Hapi = require('hapi')
var Inert = require('inert')
var server = new Hapi.Server()
var config = require('./config')
var unoconvService = require('./index')

server.connection({
  port: parseInt(config.SERVER_PORT, 10),
  routes: {
    cors: {
      credentials: true
    }
  }
})

server.register([
  {
    register: unoconvService,
    options: {}
  },
  {
    register: Inert,
    options: {}
  }
], function (err) {
  if (err) {
    console.error('Failed to load a plugin:', err)
  }
})

module.exports.start = () => {
  server.start(() => {
    console.log('Server running at:', server.info.uri)
  })
}

module.exports.stop = () => {
  server.stop(() => {
    console.log('Server stopped')
  })
}
