import Router from 'express'
import AuthController from './authController.js'
import {check} from 'express-validator';
import authMiddleWare from './authMiddleWare.js'
import roleMiddleWare from './roleMiddleWare.js'
const router = new Router()

router.post('/registration', [
    check('username', 'Username should not be empty').notEmpty(),
    check('password', 'Password should have 4-10 symbols').isLength({min: 4, max: 10})
], AuthController.registration)
router.post('/login', AuthController.login)
router.get('/users', roleMiddleWare(['ADMIN']), AuthController.getUsers)

export default router;