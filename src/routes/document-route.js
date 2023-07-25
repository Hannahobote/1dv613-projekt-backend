import express from 'express'
import { DocumentController } from '../controller/document-controller.js'
import { AuthController } from '../controller/auth-controller.js'
export const router = express.Router()

const document = new DocumentController()
const auth= new AuthController()

// register user
router.post('/', auth.authorize ,(req, res, next) => document.create(req, res, next))

// read all
router.get('/', auth.authorize ,(req, res, next) => document.read(req, res, next))

// read one
router.get('/:id', auth.authorize ,(req, res, next) => document.readOne(req, res, next))

// update one
router.put('/:id', auth.authorize, auth.userPremission,(req, res, next) => document.update(req, res, next))



