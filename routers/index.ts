import express from 'express'
import msgsRouter from './msgs'
import subsRouter from './subs'
import avatarsRouter from './avatars'
import imageRouter from './image'

const router = express.Router()

router.use('/msgs', msgsRouter)
router.use('/subs', subsRouter)
router.use('/avatars', avatarsRouter)
router.use('/image', imageRouter)


export default router
