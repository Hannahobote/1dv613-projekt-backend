import { Document } from "../models/document-model.js"

export class DocumentController {
  // Create, if signed in
  async create(req, res, next) {
    try {
      const doc = new Document({
        document_type: req.body.document_type,
        author: req.body.author,
        authorId: req.body.authorId,
        patient: req.body.patient,
        report: req.body.report,
      })

      await doc.save()
      res
        .status(201)
        .json(doc)
    } catch (error) {
      next(error)
    }

  }

  // Read
  // view all if youre signed in 
  async read(req, res, next) {
    try {
      const document = await Document.find({})
      res.send(document)
    } catch (error) {
      next(error)
    }
  }

  // read one
  async readOne(req, res, next) {
    try {
      const document = await Document.findById({ _id: req.params.id })
      res.json(document)
    } catch (error) {
      next(error)
    }
  }

  // update, inly if they created the doc or is admin, not done
  async update(req, res, next) {
    try {
      //update one
      const doc = await Document.findOne({ _id: req.params.id })
      console.log(doc.authorId, req.user.user._id)
      
      // authorize: user is admin or user is author to resouce then allow update
      if (doc.authorId === req.user.user._id) {
        // update document
        const result = await Document.updateOne({ _id: req.params.id }, {
          document_type: req.body.document_type,
          author: req.body.author,
          authorId: req.body.authorId,
          patient: req.body.patient,
          report: req.body.report,
        })

        // validate update
        if (result.acknowledged) {
          // send updated employee 
          const updatedDoc = await Document.findOne({ _id: req.params.id })
          res
            .status(200)
            .send({ 'Updated document': updatedDoc })
        } else {
          res
            .status(400)
            .send({ msg: 'invalid credentials' })
        }

      } else {
        res
          .status(400)
          .send({ error: 'not allowed' })
      }
    } catch (error) {
      next(error)
    }
  }

  // delete, only if they created the doc or is admin
  async delete(req, res, next) {
    try {
      await Document.deleteOne({ _id: param })
      res
        .status(204)
        .end()
    } catch (error) {
      next(error)
    }
  }
}