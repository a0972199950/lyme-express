import express from 'express'
import http from 'http'
import config from 'config'
import router from './routers/index'
import cors from './util/Cors'
import socketHelper from './util/SocketHelper'
import webpushHelper from './util/WebpushHelper'

const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.json())
app.use(router)

webpushHelper.init()
socketHelper.init(server)

server.listen(8000, () => {
  console.log('Server up to running')
})

console.log('frontendDomain: ', config.get('frontendDomain'))
