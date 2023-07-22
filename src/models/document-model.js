import mongoose from 'mongoose'

export const DocumentSchema = new mongoose.Schema({
  document_type: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  authorId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  patient: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  report: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
})

export const Document = mongoose.models.Document || mongoose.model('Document', DocumentSchema);