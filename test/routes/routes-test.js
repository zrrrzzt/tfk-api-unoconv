'use strict'

const tap = require('tap')
const routes = require('../../routes')

tap.equal(routes.length, 5, 'There are 5 routes')
