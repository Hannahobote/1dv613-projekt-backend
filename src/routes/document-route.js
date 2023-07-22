import express from 'express'
import { DocumentController } from '../controller/document-controller.js'
export const router = express.Router()

const documentController = new DocumentController()
