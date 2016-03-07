'use strict'

var fs = require('fs')
var uuid = require('uuid')
var unoconv = require('unoconv2')

function handleUpload (request, reply) {
  var convertToFormat = request.params.format
  var data = request.payload
  if (data.file) {
    var nameArray = data.file.hapi.filename.split('.')
    var newNameConverted = nameArray.join('.') + '.' + convertToFormat
    var fileEndingOriginal = nameArray.pop()
    var temporaryName = uuid.v4()
    var pathPre = process.cwd() + '/uploads/' + temporaryName
    var fileNameTempOriginal = pathPre + '.' + fileEndingOriginal
    var fileNameTempConverted = pathPre + '.' + convertToFormat
    var file = fs.createWriteStream(fileNameTempOriginal)

    file.on('error', function (err) {
      console.error(err)
    })

    data.file.pipe(file)

    data.file.on('end', function (err) {
      if (err) {
        reply(err)
      } else {
        unoconv.convert(fileNameTempOriginal, convertToFormat, function (err, result) {
          if (err) {
            reply(err)
          } else {
            fs.writeFile(fileNameTempConverted, result, function (err) {
              if (err) {
                reply(err)
              } else {
                reply.file(fileNameTempConverted, {
                  filename: newNameConverted
                }).on('finish', function () {
                  fs.unlink(fileNameTempOriginal)
                  fs.unlink(fileNameTempConverted)
                })
              }
            })
          }
        })
      }
    })
  }
}

module.exports.handleUpload = handleUpload
