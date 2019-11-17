const Felid = require('felid')
const injectar = require('injectar')
const cors = require('../src')

test('Should respond simple cross-site requests', (done) => {
  const instance = new Felid()
  instance.plugin(cors)
  instance.get('/test', (req, res) => {
    res.send('test')
  })

  injectar(instance.lookup())
    .get('/test')
    .header('origin', 'http://felid.com')
    .end((err, res) => {
      expect(err).toBe(null)
      expect(res.statusCode).toBe(200)
      expect(res.headers['access-control-allow-origin']).toBe('http://felid.com')
      expect(res.payload).toBe('test')
      done()
    })
})

test('Should respond preflighted requests', async () => {
  const instance = new Felid()
  instance.plugin(cors)
  instance.get('/test', (req, res) => {
    res.send('test')
  })

  let res = await injectar(instance.lookup())
    .options('/test')
    .header('origin', 'http://felid.com')
    .header('access-control-request-method', 'GET')
    .end()

  expect(res.statusCode).toBe(204)
  expect(res.headers['access-control-allow-origin']).toBe('http://felid.com')
  expect(res.headers['access-control-allow-methods']).toBe('GET,HEAD,PUT,POST,DELETE,PATCH')
  expect(res.payload).toBe('')

  res = await injectar(instance.lookup())
    .options('/test')
    .header('origin', 'http://felid.com')
    .end()

  expect(res.statusCode).toBe(200)
  expect(res.headers).not.toContain('access-control-allow-origin')
  expect(res.headers).not.toContain('access-control-allow-methods')
  expect(res.payload).toBe('')
})

test('Should set correct options', async () => {
  const instance = new Felid()
  instance.plugin(cors, {
    origin: '*',
    allowMethods: ['GET,POST'],
    exposeHeaders: ['expose', 'headers'],
    allowHeaders: ['allow', 'headers'],
    maxAge: 3600,
    credentials: true
  })
  instance.get('/test', (req, res) => {
    res.send('test')
  })

  let res = await injectar(instance.lookup())
    .get('/test')
    .header('origin', 'http://felid.com')
    .end()

  expect(res.statusCode).toBe(200)
  expect(res.headers['access-control-allow-origin']).toBe('*')
  expect(res.headers['access-control-allow-credentials']).toBe('true')
  expect(res.headers['access-control-expose-headers']).toBe('expose,headers')
  expect(res.payload).toBe('test')

  res = await injectar(instance.lookup())
    .options('/test')
    .header('origin', 'http://felid.com')
    .header('access-control-request-method', 'GET')
    .end()

  expect(res.statusCode).toBe(204)
  expect(res.headers['access-control-allow-origin']).toBe('*')
  expect(res.headers['access-control-allow-credentials']).toBe('true')
  expect(res.headers['access-control-max-age']).toBe('3600')
  expect(res.headers['access-control-allow-methods']).toBe('GET,POST')
  expect(res.headers['access-control-allow-headers']).toBe('allow,headers')
  expect(res.payload).toBe('')
})
