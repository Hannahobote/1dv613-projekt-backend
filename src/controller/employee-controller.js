import { Employee } from "../models/employee-model.js"

export class EmployeeController {

  async getAll(req, res, next) {
    try {
      //gets all users
      let employee = await Employee.find({})
      res.status(201).send({ employee })
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

      //console.log(usernameDuplicate[0], '  ', personnrDuplicate[0], ' ', worknrDuplicate[0])

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


  async read(req, res, next) {

  }

  async update(req, res, next) {
    try {
      // hash password
      const hash = await bcrypt.hash(req.body.password, 10)

      const result = await Employee.updateOne({ _id: req.param.id }, {
        username: req.body.username,
        password: hash,
        name: req.body.name,
        surname: req.body.surname,
        personnr: req.body.personnr,
        worknr: req.body.worknr,
        role: req.body.role
      })

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

    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      // delete one employee
      await Employee.deleteOne({ _id: req.param.id })
      res
        .status(204)
        .end()
    } catch (error) {
      next(error)
    }
  }
}