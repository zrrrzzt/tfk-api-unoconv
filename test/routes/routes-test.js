'use strict'

const tap = require('tap')
const routes = require('../../routes')

tap.equal(routes.length, 4, 'There are 4 routes')
