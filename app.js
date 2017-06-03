var express = require('express')
var app = express()
var reload = require('reload')
var http = require('http')
const path = require('path');

app.use(express.static('public'))
app.use('/scripts/skycons', express.static(path.join(__dirname, 'node_modules/skycons')))
app.use('/scripts/swiper', express.static(path.join(__dirname, 'node_modules/swiper/dist/js')))
app.use('/stylesheet/swiper', express.static(path.join(__dirname, 'node_modules/swiper/dist/css')))

var server = http.createServer(app)

reload(server, app)

app.listen(3000, function () {
  console.log('Mon167 app listening on port 3000!')
})
