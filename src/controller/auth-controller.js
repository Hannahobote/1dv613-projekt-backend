import { Employee } from "../models/employee-model.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

export class AuthController {


  async login(req, res, next) {
    try {
      // find user in database
      const user = await Employee.findOne({ username: req.body.username })
      // if database can find user
      if (user) {
        // compare password in db
        const validPassword = await bcrypt.compare(req.body.password, user.password)

        // if the password is valid, send access token.
        if (validPassword) {

          //generate an accesstoken and send it back
          const payload = { user }
          const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '600s' })

          res
            .status(200)
            .send({
              accessToken,
              msg: 'Access token will expire after 10 minutes. Kindly log in again when it expires, to get a new token.',
            })

        } else {
          res.status(401).send({ description: 'Credentials invalid or not provided.' })
        }

      } else {
        res.status(404).send({ description: 'User does not exist' })
      }
    } catch (error) {
      next(error)
    }
  }

  async logout(req, res, next) {

  }

  async userPremission(req, res, next) {
    // check if user is admin
    if(req.user.user.role === 'admin') {
      next()
    } else {
      res
        .status(400)
        .send({error: 'not allowed'})
    }
  }

  async authorize(req, res, next) {
    try {
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1]
      
      if(token === null) {
        return res.sendStatus(401)
      }
  
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
          return res.sendStatus(403)
        } 
        req.user = user
        next()
      })
  
    } catch (error) {
      next(error)
    }
  }
}