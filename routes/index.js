'use strict'

var handlers = require('../handlers')

var routes = [
  {
    method: 'POST',
    path: '/unoconv/{format}',
    config: {
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data'
      },

      handler: handlers.handleUpload
    }
  }
]

module.exports = routes