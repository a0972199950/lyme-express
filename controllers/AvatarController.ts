import { Request, Response } from 'express'
import { storage } from '../util/Firebase'

class AvatarController {
  public async readAll(req: Request, res: Response) {
    try {
      const avatarList = await storage.ref('avatars').listAll()
      const avatarsRef = avatarList.items

      const avatars = await Promise.all(
        avatarsRef.map((avatarRef) => {
          return avatarRef.getDownloadURL()
        })
      )

      res.json({ avatars })
    } catch(e) {
      res.status(500).json({ error: true, message: e.message })
    }
  }
}

export default new AvatarController()