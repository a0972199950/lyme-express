import express from 'express'
import msgsRouter from './msgs'
import imageRouter from './image'

const router = express.Router()

router.use('/msgs', msgsRouter)
router.use('/image', imageRouter)


export default router
