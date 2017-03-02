var express = require('express')
var app = express()
var reload = require('reload')
var http = require('http')

app.use(express.static('public'))

var server = http.createServer(app)

reload(server, app)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
