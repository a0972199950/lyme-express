import express from 'express'
import avatarController from '../controllers/AvatarController'

const router = express.Router()

router.get('/', avatarController.readAll)

export default router