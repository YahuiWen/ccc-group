const Koa = require('koa')
const app = new Koa()
// Middleware
//first layer
const  durMidd = require('./middleware/koa_response_duration')
app.use(durMidd)
//second layer
const  headerMidd = require('./middleware/koa_response_header')
app.use(headerMidd)
//third layer
const  dataMidd = require('./middleware/koa_response_data')
app.use(dataMidd)

app.listen(8888)

const webSocketService = require('./service/webSocketService')
webSocketService.listen()

