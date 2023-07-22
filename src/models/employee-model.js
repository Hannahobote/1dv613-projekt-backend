import mongoose from 'mongoose'

export const employeeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, 
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  personnr: {
    type: String,
    required: true,
    unique: true
  },
  worknr: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
  versionKey: false
})

export const Employee =  mongoose.models.Employee || mongoose.model('Employee', employeeSchema);