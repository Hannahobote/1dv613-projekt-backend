import express from 'express'
import { AuthController } from '../controller/auth-controller.js'
export const router = express.Router()

const authController = new AuthController()

// register user
router.post('/register', (req, res, next) => authController.register(req, res, next))

// login
router.post('/login', (req, res, next) => authController.login(req, res, next))

// current user
router.get('/current-user', authController.authorize, (req, res, next) => authController.currentUser(req, res, next))

