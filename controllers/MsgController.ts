import { Request, Response } from 'express'
import { database } from '../util/Firebase'

class MsgController {
  public async readAll(req: Request, res: Response) {
    const timestamp = parseInt((req.query.timestamp as string)) || new Date().valueOf()
    const limit = parseInt((req.query.limit as string)) || 10

    try {
      const msgsSnap = await database.ref('msgs')
        .orderByChild('createdAt')
        .endAt(timestamp)
        .limitToLast(limit)
        .once('value')

      let msgs = msgsSnap.val()

      msgs && (msgs = Object.values(msgsSnap.val()))

      res.json({ msgs })
    } catch(e) {
      res.status(500).json({ error: true, message: e.message })
    }
  }
}

export default new MsgController()