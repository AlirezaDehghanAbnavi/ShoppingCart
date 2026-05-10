const { Double } = require('mongodb');
const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log("Enter Password as CLI Argument");
    process.exit;
}

const password = process.argv[2];

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(url, { family: 4 })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    });

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
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: Double,
        required: false
    }
});

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

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;