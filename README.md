# felid-cors

[![npm version](https://img.shields.io/npm/v/felid-cors.svg)](https://www.npmjs.com/package/felid-cors) [![Build Status](https://travis-ci.org/felidjs/felid-cors.svg?branch=master)](https://travis-ci.org/felidjs/felid-cors) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A [Felid](https://github.com/felidjs/felid) plugin for [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

## Install

```bash
npm install felid-cors
```

or

```bash
yarn add felid-cors
```

## Usage

```javascript
const Felid = require('felid')
const cors = require('felid-cors')

const app = new Felid()
app.plugin(cors, {
  origin: '*',                          // set the `access-control-allow-origin` header, default is the request `Origin` header.
  allowMethods: ['GET,POST'],           // set the `access-control-allow-methods` header, default is 'GET,HEAD,PUT,POST,DELETE,PATCH'.
  exposeHeaders: ['expose', 'headers'], // set the `access-control-expose-headers` header.
  allowHeaders: ['allow', 'headers'],   // set the `access-control-allow-headers` header.
  maxAge: 3600,                         // set the `access-control-max-age` header, in seconds.
  credentials: true                     // set the `access-control-credentials` header.
})
```

For details, please check [corsen](https://github.co/fralonra/corsen).

## License

MIT
