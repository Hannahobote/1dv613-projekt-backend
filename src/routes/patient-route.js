import express from 'express'
import { PatientController } from '../controller/patient-controller.js'
import { AuthController } from '../controller/auth-controller.js'
export const router = express.Router()

const patient = new PatientController()
const auth = new AuthController()

// create
router.post('/', auth.authorize, auth.userPremissionAdmin, (req, res, next) => patient.create(req, res, next))

// Read one
router.get('/:id', auth.authorize, (req, res, next) => patient.readOne(req, res , next))

// read all patients
router.get('/', auth.authorize, (req, res, next) => patient.readAll(req, res , next))


// update one patient
router.patch('/:id', auth.authorize, auth.userPremissionEmployeePatient, (req, res, next) => patient.update(req, res , next))

// delete one patient
router.delete('/:id', auth.authorize, auth.userPremissionEmployeePatient, (req, res, next) => patient.delete(req, res , next))