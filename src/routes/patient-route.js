import express from 'express'
import { PatientController } from '../controller/patient-controller.js'
export const router = express.Router()

const patientController = new PatientController()
