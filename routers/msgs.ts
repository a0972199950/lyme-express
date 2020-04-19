import express from 'express'
import msgController from '../controllers/MsgController'

const router = express.Router()

router.get('/', msgController.readAll)

export default router