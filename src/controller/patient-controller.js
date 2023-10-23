import { Patient } from "../models/patient-model.js"

export class PatientController {
  async create(req, res, next) {
    let personnrDuplicate = await Patient.find({ personnr: req.body.personnr })
    let phonenrDuplicate = await Patient.find({ phonenr: req.body.phonenr })
    
    console.log(personnrDuplicate[0], phonenrDuplicate[0])
     // if email or username is true/exists the thow error
    if (personnrDuplicate[0] !== undefined) {
      res.status(409).send({ description: 'a user with this person number already exist.' })
      return
    }

    if (phonenrDuplicate[0] !== undefined) {
      res.status(409).send({ description: 'a user with this phone number already exist.' })
      return
    }

    try {
      const patient = new Patient({
        name: req.body.name,
        surname: req.body.surname,
        personnr: req.body.personnr,
        phonenr: req.body.phonenr,
        adress: req.body.adress,
        kontaktman_id: req.body.kontaktman_id,
        kontaktman_name: req.body.kontaktman_name
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
      if(await Patient.findById({ _id: req.params.id })) {
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
      if(await Patient.findById({ _id: req.params.id })) {

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
            .send({ msg: 'Could not update' })
        }
  
      } else {
        res
          .status(404)
          .send('patient not found')
      }
    } catch (error) {
      next(error)
    }
  }


  async delete(req, res, next) {
    try {
      if(await Patient.findById({ _id: req.params.id })) {
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
}