import express from 'express'
import { EmployeeController } from '../controller/employee-controller.js'
import { AuthController } from '../controller/auth-controller.js'
export const router = express.Router()

const employee = new EmployeeController()
const auth = new AuthController()


// get all employees
router.get('/', auth.authorize, auth.userPremission, (req, res, next) => employee.getAll(req, res , next))


// register (create)
router.post('/', auth.authorize, auth.userPremission, (req, res, next) => employee.reister(req, res, next))


// get one employee (read)
router.get('/:id', auth.authorize, auth.userPremission, (req, res, next) => employee.getOne(req, res , next))


// update one employee
router.get('/:id', auth.authorize, auth.userPremission, (req, res, next) => employee.update(req, res , next))

// delete one employee
router.get('/:id', auth.authorize, auth.userPremission, (req, res, next) => employee.delete(req, res , next))