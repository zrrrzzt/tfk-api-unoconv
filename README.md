[![Build Status](https://travis-ci.org/zrrrzzt/tfk-api-unoconv.svg?branch=master)](https://travis-ci.org/zrrrzzt/tfk-api-unoconv)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# tfk-api-unoconv
Unoconv as a webservice

## Docker

Build image

```bash
$ docker build -t unoconv-webservice .
```

Run image

```bash
$ docker run -d -p 80:3000 --name unoconv-webservice unoconv-webservice
```

## Usage

Post the file you want to convert to the server and get the converted file in return.

See all possible conversions on the [unoconv website](http://dag.wiee.rs/home-made/unoconv/).

API for the webservice is /unoconv/{format-to-convert-to} so a docx to pdf would be

```bash
$ curl --form file=@myfile.docx http://localhost/unoconv/pdf > myfile.pdf
```

### Formats

To see all possible formats for convertion visit ```/unoconv/formats```

To see formats for a given type ```/unoconv/formats/{document|graphics|presentation|spreadsheet}```

### Versions

To see all versions of unoconv and dependencies lookup ```/unoconv/versions```

## Environment

You can change the webservice port and filesize-limit by changing environment variables.

SERVER_PORT default is 3000

PAYLOAD_MAX_SIZE default is 1048576 (1 MB)

Change it in the Dockerfile or create an env-file and load it at containerstart

```bash
$ docker run --env-file=docker.env -d -p 80:3000 --name unoconv-webservice unoconv-webservice
```

## License

[MIT](LICENSE)

![alt text](https://robots.kebabstudios.party/tfk-api-unoconv.png "Robohash image of tfk-api-unoconv")
