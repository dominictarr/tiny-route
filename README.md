# tiny-route

Tiniest routing library.

Routes on a regular expression or a string and calls a handler.
`route(rx, handler(req, res, next))`

# example

``` js
var Stack = require('stack')
var http  = require('http')
var route = require('tiny-route')

http.createServer(Stack(
  route(/\/users/(\w+)/, function (req, res, next) {
    console.log('accessed user', req.params)
    req.end('hello', req.params[0])
    //and so on.
  }),
  route('/index.html', function (req, res) {
    res.end('<!DOCTYPE html><h1>Hello World!</h1>')
  })
))
```

you can also use `tiny-route` to mount a middleware on a path.

``` js
http.createServer(Stack(
  route('/stuff/', Stack(
    route(/\/users/(\w+)/, function (req, res, next) {
      console.log('accessed user', req.params)
      req.end('hello', req.params[0])
      //and so on.
    }),
    route('/index.html', function (req, res) {
      res.end('<!DOCTYPE html><h1>Hello World!</h1>')
    })
  ))
))
```

Now you access `/users/foo` as `/stuff/users/foo`,
this works because tiny-route removes the prefix of the match from `req.url`

## License

MIT
