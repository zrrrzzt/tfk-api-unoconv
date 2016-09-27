'use strict'

const fs = require('fs')
const uuid = require('uuid')
const unoconv = require('unoconv2')
const formats = require('../lib/data/formats.json')
const pkg = require('../package.json')

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

module.exports.showFormats = (request, reply) => {
  reply(formats)
}

module.exports.showFormat = (request, reply) => {
  const params = request.params
  const format = params ? formats[request.params.type] : false
  if (!format) {
    reply('Format type not found').code(404)
  } else {
    reply(format)
  }
}

module.exports.showVersions = (request, reply) => {
  let versions = {}
  Object.keys(pkg.dependencies).forEach((item) => {
    versions[item] = pkg.dependencies[item]
  })
  Object.keys(pkg.unoconv).forEach((item) => {
    versions[item] = pkg.unoconv[item]
  })
  reply(versions)
}
