import express from 'express'
import subController from '../controllers/SubController'

const router = express.Router()

router.post('/', subController.create)

router.get('/:id', subController.read)

router.delete('/:id', subController.delete)

export default router