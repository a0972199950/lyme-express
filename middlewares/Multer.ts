import multer from 'multer'

const memoryStorage = multer.memoryStorage()

const upload = multer({
  limits: {
    fieldSize: 1000000
  },

  fileFilter(req, file, cb) {
    const extension = file.originalname.split('.').slice(-1)[0]
    // if (!extension.match(/(jpg|jpeg|png)$/)) {
    //   return cb(new Error(`檔案格式不正確，接收到${extension}，限制為jpg, jpeg 或 png`))
    // }

    cb(null, true)
  },

  storage: memoryStorage
})

export const uploadWithErrorHandler = (fieldName: string) => {
  try {
    return upload.single(fieldName)
  } catch (e) {
    console.log(e)
  }
}

export default upload