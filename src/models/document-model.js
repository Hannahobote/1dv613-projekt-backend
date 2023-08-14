import mongoose from 'mongoose'

export const DocumentSchema = new mongoose.Schema({
  document_type: {
    type: String,
    required: true,
  },
  author_name: {
    type: String,
    required: true,
  },
  author_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  patient_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  patient_name: {
    type: String,
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