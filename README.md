# tfk-api-unoconv
Unoconv as a webservice

## Docker
Build image

```sh
$ docker build -t unoconv-weservice .
```

Run image

```sh
$ docker run -d -p 80:3000 --name unoconv-webservice unoconv-webservice
```

## Usage

Post the file you want to convert to the server and get the converted file in return.

See all possible conversions on the [unoconv website](http://dag.wiee.rs/home-made/unoconv/).

API for the webservice is /unoconv/{format-to-convert-to} so a docx to pdf would be

```sh
$ curl --form file=@myfile.docx http://192.168.99.100/unoconv/pdf > myfile.pdf
```

## Environment

You can change the webservice port and filesize-limit by changing environment variables.

SERVER_PORT default is 3000

PAYLOAD_MAX_SIZE default is 1048576 (1 MB)

Change it in the Dockerfile or create an env-file and load it at containerstart

```sh
$ docker run --env-file=docker.env -d -p 80:3000 --name unoconv-webservice unoconv-webservice
```