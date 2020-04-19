import { Request, Response } from 'express'
import { storage } from '../util/Firebase'

declare module 'express-serve-static-core' {
  interface Request {
    file: Buffer
  }
}

// CREDIT: https://github.com/firebase/firebase-js-sdk/issues/349
(global as any).XMLHttpRequest = require('xhr2')

const uuid = () => {
  return Math.floor((1 + Math.random()) * 0xfffff).toString(16).substring(1)
}

class ImageController {
  public async uploadImage(req: Request, res: Response) {
    const imageRef = storage.ref().child(`images/${uuid()}.jpg`)
    const imageBuffer = req.file.buffer

    try {
      const uploadTask = imageRef.put(imageBuffer, { contentType: 'image/jpeg' })
      uploadTask.on('state_changed', {
        'next': () => {
        },
        'error': (e) => {
          res.status(500).json({ error: true, message: e.message })
        },
        'complete': async () => {
          const url = await uploadTask.snapshot.ref.getDownloadURL()
          console.log(`image uploaded, url: ${url}`)
          res.json({ url })
        }
      })
    } catch(e) {
      res.status(500).json({ error: true, message: e.message })
    }
  }
}

export default new ImageController()