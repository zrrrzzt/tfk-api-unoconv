'use strict'

const tap = require('tap')
const handlers = require('../../handlers')

tap.equal(Object.keys(handlers).length, 5, 'There are 5 handlers')

tap.ok(handlers.handleUpload, 'Handler has method handleUpload')

tap.ok(handlers.showFormats, 'Handler has method showFormats')

tap.ok(handlers.showFormat, 'Handler has method showFormat')

tap.ok(handlers.showVersions, 'Handler has method showVersions')

tap.ok(handlers.healthcheck, 'Handler has method healthcheck')
