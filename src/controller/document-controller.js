import { Document } from "../models/document-model.js"

export class DocumentController {
  // Create, if signed in
  async create(req, res, next) {
    try {
      const { document_type, author_name, author_id, patient_name, patient_id, report } = req.body
      console.log(document_type, author_name, author_id, patient_name, patient_id, report)
      const doc = new Document({
        document_type,
        author_id,
        author_name,
        patient_id,
        patient_name,
        report
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
      if (await Document.findById({ _id: req.params.id })) {
        const document = await Document.findById({ _id: req.params.id })
        res.json(document)
      } else {
        res
          .status(404)
          .send('Document not found')
      }
    } catch (error) {
      next(error)
    }
  }

  // update, only if they created the doc or is admin, not done
  async update(req, res, next) {
    try {

      if (await Document.findById({ _id: req.params.id })) {
        // update document
        const { document_type, report } = req.body
        const result = await Document.updateOne({ _id: req.params.id }, {
          document_type,
          report,
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
          .status(404)
          .end()
      }
    } catch (error) {
      next(error)
    }
  }

  // delete, only if they created the doc or is admin
  async delete(req, res, next) {
    try {
      if (await Document.findById({ _id: req.params.id })) {
        await Document.deleteOne({ _id: req.params.id })
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