import express from 'express'
import http from 'http'
import config from 'config'
import router from './routers/index'
import cors from './util/Cors'
import socketHelper from './util/SocketHelper'
import webpushHelper from './util/WebpushHelper'

const host: string = config.get('host')
const port: number = config.get('port')

const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(router)

webpushHelper.init()
socketHelper.init(server)


console.log('frontendDomain: ', config.get('frontendDomain'))

server.listen(port, host, () => {
  console.log(`Server up to running at ${host}:${port}`)
})

