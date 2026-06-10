const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: [6, 'Username must be at least 6 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\s*[\w+_-]+(\.[\w+_-]+)*@[\w+_-]+\.[\w+_-]+(\.[\w+_-]+)*\s*$/, 'Please provide a valid email address']
  },
  name: {
    type: String,
    required: [true, 'name is required'],
    minLength: [2, 'name must be at least 2 characters long']
  },

  passwordHash: {
    type: String,
    required: [true, 'Password is required']
  },
}, {
  timestamps: true
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User