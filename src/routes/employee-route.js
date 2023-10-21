import express from 'express'
import { EmployeeController } from '../controller/employee-controller.js'
import { AuthController } from '../controller/auth-controller.js'
export const router = express.Router()

const employee = new EmployeeController()
const auth = new AuthController()


// get all employees
router.get('/', auth.authorize, auth.userPremissionAdmin, (req, res, next) => employee.read(req, res , next))


// register (create)
router.post('/', auth.authorize, auth.userPremissionAdmin, (req, res, next) => employee.register(req, res, next))


// get one employee (read)
router.get('/:id', auth.authorize, auth.userPremissionAdmin, (req, res, next) => employee.readOne(req, res , next))


// update one employee
router.patch('/:id', auth.authorize, auth.userPremissionAdmin, (req, res, next) => employee.update(req, res , next))

// delete one employee
router.delete('/:id', auth.authorize, auth.userPremissionAdmin, (req, res, next) => employee.delete(req, res , next))