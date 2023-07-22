import express from 'express'
import { EmployeeController } from '../controller/employee-controller.js'
export const router = express.Router()

const employeeController = new EmployeeController()
