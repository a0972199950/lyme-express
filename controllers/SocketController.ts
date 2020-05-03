import socketIO from'socket.io'
import firebase, { database } from '../util/Firebase'
import webpushHelper from '../util/WebpushHelper'

interface IMsgPayload {
  msg: string
  username: string
  userAvatar: string
  format: 'TEXT' | 'IMAGE'
}

interface IMsgDocument extends IMsgPayload {
  createdAt: number
  uid: string
}

class SocketController {
  public async connect(socket: SocketIO.Socket) {
    const uid = socket.id
    try {
      await database.ref(`onlineUsers/${uid}`).set({ uid })
    } catch(e) {
      socket.emit('error', {
        message: '增加新使用者到onlineUsers失敗',
        log: e
      })
    }
  }

  public disconnect(socket: SocketIO.Socket) {
    return async () => {
      const uid = socket.id
      try {
        await database.ref(`onlineUsers/${uid}`).remove()
      } catch(e) {
        socket.emit('error', {
          message: '從onlineUsers刪除使用者失敗',
          log: e
        })
      }
    }
  }

  public newMsg(socket: SocketIO.Socket) {
    return async (msgPayload: IMsgPayload) => {
      try {
        await database.ref('msgs').push({
          createdAt: firebase.database!.ServerValue.TIMESTAMP,
          uid: socket.id,
          ...msgPayload
        })
      } catch(e) {
        socket.emit('error', {
          message: '上傳訊息到firebase失敗',
          log: e
        })
      }
    }
  }

  public async broadcastMsg(io: socketIO.Server, msgDocument: IMsgDocument) {
    io.emit('broadcast-msg', msgDocument)

    try {
      const subsSnap = await database.ref('subs').once('value')
      subsSnap.forEach((subSnap: any) => {
        const sub = subSnap.val()

        const pushConfig = {
          endpoint: sub.endpoint,
          keys: {
            auth: sub.keys.auth,
            p256dh: sub.keys.p256dh
          }
        }

        const pushPayload = {
          type: 'BROADCAST_MSG',
          title: `${msgDocument.username}:`,
          body: msgDocument.format === 'TEXT' ? msgDocument.msg : '',
          image: msgDocument.format === 'IMAGE' ? msgDocument.msg : null,
          url: '/'
        }

        webpushHelper.sendNotification(pushConfig, JSON.stringify(pushPayload))  
      })
    } catch(e) {
      console.log(e.message)
    }
  }

  public broadcastUserAmount(io: socketIO.Server, onlineUsersAmount: number) {
    io.emit('broadcast-user-amount', onlineUsersAmount)
  }
}

export default new SocketController()
