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
      console.log(error)
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
      if(await this.patientExist(req.params.id)) {
        const patient = await Patient.findById({ _id: req.params.id })
        res
          .status(200)
          .send(patient)
      } else {
        res
          .status(404)
          .send('patient not found')
      }
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
      if(await this.patientExist(req.params.id)) {
        await Patient.deleteOne({ _id: req.params.id })
        res
          .status(204)
          .end()
      } else {
        res
        .status(404)
        .send('Patient not found')
        .end()
      }
    } catch (error) {
      next(error)
    }
  }

 async patientExist(_id) {
    const patient = await Patient.findOne({ _id })
    if(patient === null) {
      console.log('Patient not found')
      return false
    } else {
      console.log('patient exist')
      return true
    }
  }
}