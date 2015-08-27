'use strict'

var fs = require('fs')
var uuid = require('uuid')
var unoconv = require('unoconv2')

function createFileName (filename) {
  var nameArray = filename.split('.')
  var fileEnding = nameArray.pop()
  var newName = uuid.v4()
  return newName + '.' + fileEnding
}

function handleUpload (request, reply) {
  var convertToFormat = request.params.format
  var data = request.payload
  if (data.file) {
    var temporaryName = createFileName(data.file.hapi.filename)
    var path = process.cwd() + "/uploads/" + temporaryName
    var file = fs.createWriteStream(path)

    file.on('error', function (err) {
      console.error(err)
    })

    data.file.pipe(file)

    data.file.on('end', function (err) {
      if (err) {
        reply(err)
      } else {
        unoconv.convert(path, convertToFormat, function (err, result) {
          if (err) {
            reply(err)
          } else {
            reply(result)
          }
        })

      }
    })
  }
}

module.exports.handleUpload = handleUpload