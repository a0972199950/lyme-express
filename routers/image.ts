import express from 'express'
import imageController from '../controllers/ImageController'
import upload from '../middlewares/Multer'

const router = express.Router()

router.post('/', upload.single('image'), imageController.uploadImage)

export default router