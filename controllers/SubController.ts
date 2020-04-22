import { Request, Response } from 'express'
import { database } from '../util/Firebase'

class SubController {
  public async create(req: Request, res: Response) {
    const sub = req.body.sub

    try {
      const id = sub.keys.auth
      await database.ref(`/subs/${id}`).set(sub)
      res.json({ error: false, sub })
    } catch(e) {
      res.status(500).json({ error: true, message: e.message })
    }
  }

  public async read(req: Request, res: Response) {
    const id = req.params.id

    try {
      const subSnap = await database.ref(`/subs/${id}`).once('value')
      const sub = subSnap.val()

      res.json({ sub })
    } catch(e) {
      res.status(500).json({ error: true, message: e.message })
    }
  }

  public async delete(req: Request, res: Response) {
    const id = req.params.id

    try {
      await database.ref(`/subs/${id}`).set(null)

      res.json({ error: false })
    } catch(e) {
      res.status(500).json({ error: true, message: e.message })
    }
  }
}

export default new SubController()