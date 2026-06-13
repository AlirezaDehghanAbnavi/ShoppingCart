const { Double } = require('mongodb')
const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be a positive number']
  },
  category: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: false,
    min: 0,
    max: 5
  }
})

itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    return {
      id: returnedObject._id.toString(),
      title: returnedObject.title,
      description: returnedObject.description,
      price: returnedObject.price,
      category: returnedObject.category,
      rating: returnedObject.rating
    }
  }
})

module.exports = mongoose.model('Item', itemSchema)