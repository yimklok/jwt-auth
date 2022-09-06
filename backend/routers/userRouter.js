import express from 'express'
import { useContr } from '../controllers/Users.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.post('/register',useContr.register)
router.post('/login',useContr.login)
router.get('/logout',useContr.logout)
router.get('/refresh_token',useContr.refreshToken)
router.get('/info',auth, useContr.getUser)

export default router