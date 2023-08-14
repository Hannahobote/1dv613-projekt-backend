import mongoose from 'mongoose'

export const patientsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  personnr: {
    type: String,
    required: true,
    unique: true
  },
  phonenr: {
    type: Number,
    required: true,
    unique: true
  },
  adress: {
    type: String,
    required: true,
  },
  kontaktman_id: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  kontaktman_name: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export const Patient = mongoose.models.Patient || mongoose.model('Patient', patientsSchema);