import socketIO from'socket.io'
import { Server } from 'http'
import socketController from '../controllers/SocketController'
import { database } from './Firebase'

class SocketHelper {
  private opts = {
    path: '/socket',
    serveClient: false,
    pingTimeout: 5000,
    pingInterval: 1000
  }

  public io!: socketIO.Server

  public init(server: Server) {
    const io = socketIO(server, this.opts)
    this.io = io

    this.listenSocketConnect()
    this.listenFirebaseChange()
  }

  public listenSocketConnect() {
    const io = this.io

    io.on('connect', this.registerEvents.bind(this))
  }

  public listenFirebaseChange() {
    database.ref('msgs').on('child_added', (msgSnap) => {
      if(!this.io) { return }

      const msgDocument = msgSnap.val()
      socketController.broadcastMsg(this.io, msgDocument)
    })

    database.ref('onlineUsers').on('value', (onlineUsersSnap) => {
      const onlineUsersAmount = onlineUsersSnap.numChildren()

      socketController.broadcastUserAmount(this.io, onlineUsersAmount)
    })
  }

  private registerEvents(socket: SocketIO.Socket) {
    socketController.connect(socket)

    socket.on('disconnect', socketController.disconnect(socket))

    socket.on('new-msg', socketController.newMsg(socket))
  }
}

export default new SocketHelper()
