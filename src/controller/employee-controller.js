import { Employee } from "../models/employee-model.js"
import bcrypt from 'bcrypt'

export class EmployeeController {

  async read(req, res, next) {
    try {
      const allEmployees = await Employee.find({})
      res
        .status(200)
        .send(allEmployees)
    } catch (error) {
      next(error)
    }
  }

  async readOne(req, res, next) {
    try {
      const employee = await Employee.findById({ _id: req.params.id })
      if (employee) {
        res
          .status(200)
          .send(employee)
      } else {
        res
          .status(404)
          .end()
      }
    } catch (error) {
      next(error)
    }
  }

  async register(req, res, next) {
    try {
      //register an employee
      //check if username is already registered
      let usernameDuplicate = await Employee.find({ username: req.body.username })
      let personnrDuplicate = await Employee.find({ personnr: req.body.personnr })
      let worknrDuplicate = await Employee.find({ worknr: req.body.worknr })

      // if email or username is true/exists the thow error
      if (usernameDuplicate[0] !== undefined) {
        res.status(409).send({ description: 'a user with this username already exist.' })
        return
      }

      if (personnrDuplicate[0] !== undefined) {
        res.status(409).send({ description: 'a user with this personnr already exist.' })
        return
      }

      if (worknrDuplicate[0] !== undefined) {
        res.status(409).send({ description: 'a user with this worknr already exist.' })
        return
      }


      // hash password
      const hash = await bcrypt.hash(req.body.password, 10)

      // create account
      const employee = new Employee({
        username: req.body.username,
        password: hash,
        name: req.body.name,
        surname: req.body.surname,
        personnr: req.body.personnr,
        worknr: req.body.worknr,
        role: req.body.role
      })

      // save user
      employee.save()

      // send back id as respond
      res.status(201).send({ employee })

    } catch (error) {
      next(error)
      res.send(error)
    }
  }


  async update(req, res, next) {
    try {

      if (await Employee.findById({ _id: req.params.id })) {
        let result = {}

        // if admin wants to update password, then include in the update
        console.log(req.body.password)
        if (req.body.password) {
          // hash password
          const hash = await bcrypt.hash(req.body.password, 10)
          result = await Employee.updateOne({ _id: req.params.id }, {
            username: req.body.username,
            password: hash,
            name: req.body.name,
            surname: req.body.surname,
            personnr: req.body.personnr,
            worknr: req.body.worknr,
            role: req.body.role
          })
        } else {
          result = await Employee.updateOne({ _id: req.params.id }, {
            username: req.body.username,
            name: req.body.name,
            surname: req.body.surname,
            personnr: req.body.personnr,
            worknr: req.body.worknr,
            role: req.body.role
          })
        }

        if (result.acknowledged) {
          // send updated employee 
          const updatedEmployee = await Employee.findOne({ _id: req.params.id })
          res
            .status(200)
            .send({ 'Updated employee': updatedEmployee })
        } else {
          res
            .status(400)
            .send({ msg: 'invalid credentials' })
        }

      } else {
        res
          .status(404)
          .end()
      }
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      if (await Employee.findById({ _id: req.params.id })) {
        // delete one employee
        await Employee.deleteOne({ _id: req.params.id })
        res
          .status(204)
          .end()
      } else {
        res
          .status(404)
          .end()
      }
    } catch (error) {
      next(error)
    }
  }
}