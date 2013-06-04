var assert = require('assert')

var route = require('./')

var called = 0

var handler = route(/^\/hello\/(\w+)/, function (req, res) {
  res.end('hello ' + req.params[0])
})

handler({url: '/hello/world'}, {end: function (data) {
  called ++
  console.log(data)
  assert.equal(data, 'hello world')
}})

var handler2 = route.get(/^\/hello\/(\w+)/, function (req, res) {
  res.end('hello ' + req.params[0])
})


handler({url: '/hello/world', method: 'GET'}, {end: function (data) {
  called ++
  console.log('GET', data)
  assert.equal(data, 'hello world')
}})

assert(called)
