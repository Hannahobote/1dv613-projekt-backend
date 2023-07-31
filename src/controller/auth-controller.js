import { Employee } from "../models/employee-model.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { Document } from "../models/document-model.js"

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
              user,
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

  /**
   * Checks if user is admin. This is used for manipulating patient info, employee info.
   * Only admin is allowed to manipulate anther employee or patient info.
   * @param {*} req  .
   * @param {*} res  .
   * @param {*} next .
   */
  async userPremissionAdmin(req, res, next) {
    // check if user is admin
    if (req.user.user.role === 'admin') {
      next()
    } else {
      res
        .status(400)
        .send({ error: 'not allowed' })
    }
  }

  /**
 * Checks if user is admin, can update or delete.
 * Employee is only allowed to manipulate documents they have created.
 *
 * @param {*} req  .
 * @param {*} res  .
 * @param {*} next .
 */
  async userPremissionAdminAndEmployee(req, res, next) {
    // check if user is admin or owner of resouce 
    const document = await Document.findById({ _id: req.params.id })

    if (req.user.user.role === 'admin') {
      next()
    } else if (document.authorId === req.user.user.id) {
      console.log(document.authorId === req.user.user.id)
      next()
    } else {
      res
        .status(400)
        .send({ error: 'not allowed: user is not creator of this resource' })
    }
  }

  /**
   * Authorize: give certain access to user. Cheks i user is logged in.
   *
   * @param {*} req .
   * @param {*} res .
   * @param {*} next .
   * @returns 
   */
  async authorize(req, res, next) {
    try {
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1]

      if (token === null) {
        return res.sendStatus(401)
      }

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
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