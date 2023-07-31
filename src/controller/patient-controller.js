import { Patient } from "../models/patient-model.js"

export class PatientController {
  async create(req, res, next) {
    try {
      const patient = new Patient({
        name: req.body.name,
        surname: req.body.surname,
        personnr: req.body.personnr,
        phonenr: req.body.phonenr,
        adress: req.body.adress,
        kontaktman: req.body.kontaktman
      })

      await patient.save()
      res
        .status(201)
        .json(patient)
    } catch (error) {
      next(error)
    }
  }

  async readAll(req, res, next) {
    try {
      const patients = await Patient.find()
      res
        .status(200)
        .send(patients)
    } catch (error) {
      next(error)
    }
  }

  async readOne(req, res, next) {
    try {
      const patient = await Patient.findById({ _id: req.params.id })
      res
        .status(200)
        .send(patient)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const result = await Patient.updateOne({ _id: req.params.id }, {
        name: req.body.name,
        surname: req.body.surname,
        personnr: req.body.personnr,
        phonenr: req.body.phonenr,
        adress: req.body.adress,
        kontaktman: req.body.kontaktman
      })

      // validate update
      if (result.acknowledged) {
        // send updated 
        const updatedPatient = await Patient.findOne({ _id: req.params.id})
        console.log(updatedPatient)
        res
          .status(200)
          .send({ 'Updated patient': updatedPatient })
      } else {
        res
          .status(400)
          .send({ msg: 'invalid credentials' })
      }

    } catch (error) {
      next(error)
    }
  }


  async delete(req, res, next) {
    try {
      await Patient.deleteOne({ _id: req.params.id })
      res
        .status(204)
        .end()
    } catch (error) {
      next(error)
    }
  }
}