'use strict'

const fs = require('fs')
const uuid = require('uuid')
const unoconv = require('unoconv2')

module.exports.handleUpload = (request, reply) => {
  const convertToFormat = request.params.format
  const data = request.payload
  if (data.file) {
    const nameArray = data.file.hapi.filename.split('.')
    const fileEndingOriginal = nameArray.pop()
    const temporaryName = uuid.v4()
    const pathPre = process.cwd() + '/uploads/' + temporaryName
    const fileNameTempOriginal = pathPre + '.' + fileEndingOriginal
    const file = fs.createWriteStream(fileNameTempOriginal)

    file.on('error', (error) => {
      console.error(error)
    })

    data.file.pipe(file)

    data.file.on('end', (err) => {
      if (err) {
        reply(err)
      } else {
        unoconv.convert(fileNameTempOriginal, convertToFormat, (err, result) => {
          if (err) {
            reply(err)
          } else {
            console.log('finished converting')
            reply(result)
              .on('finish', () => {
                fs.unlink(fileNameTempOriginal)
              })
          }
        })
      }
    })
  }
}

module.exports.showCapabilities = (request, reply) => {
  unoconv.detectSupportedFormats((error, result) => {
    if (error) {
      console.error(error)
      reply(error)
    } else {
      reply(result)
    }
  })
}
