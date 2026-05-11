require('dotenv').config()
const path = require('path')
const express = require('express')
const morgan = require('morgan')

const app = express()
const Item = require('./models/item')
const errorHandler = require('./utils/middleware')

app.use(express.json())
app.use(express.static(path.join(__dirname, "Frontend/dist")));

morgan.token('body', (req) => {
    return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
 

app.get('/api/items', (request, response, next) => {
    Item.find({})
        .then(items => response.json(items))
        .catch(error => next(error))
})


app.get('/info', (request, response) => {
    Item.countDocuments({}).then(count => {
        response.send(`
      <p>ShoppingCart has info for ${count} items</p>
      <p>${new Date()}</p>
    `);
    })
        .catch(err => {
            console.log(err);
            response.status(500).send('Error Fetching Data');
        })
})

app.get('/api/items/:id', (request, response, next) => {
    Item.findById(request.params.id)
        .then(item => {
            if (item) {
                response.json(item)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            next(error)
        })
})

app.post('/api/items/bulk', async (request, response, next) => {
    const itemsArray = request.body.items;

    Item.insertMany(itemsArray)
        .then(savedItem => {
            console.log(`Successfully saved ${savedItem.length} products!`);
            response.status(201).json(savedItem)
        })
        .catch(error => {
            console.log('Error saving products:', error.message);
            next(error);
        });
})

app.post('/api/items', async (request, response, next) => {
    try {
        const item = new Item({
            title: request.body.title,
            description: request.body.description,
            price: request.body.price,
            category: request.body.category, 
            rating: request.body.rating    
        });

        const savedItem = await item.save();
        response.status(201).json(savedItem);
    } catch (error) {
        next(error); 
    }
});

app.put('/api/items/:id', (request, response, next) => {
    const { title, description, price, category, rating } = request.body
    Item.findById(request.params.id)
        .then(item => {
            if (!item) {
                return response.status(404).end()
            }

            item.title = title
            item.description = description
            item.price = price
            item.category = category
            item.rating = rating

            return item.save().then((updatedItem) => {
                response.json(updatedItem)
            })
        })
        .catch(error => next(error))
})

app.delete('/api/items/:id', async (request, response, next) => {
    try {
        await Item.findByIdAndDelete(request.params.id);
        response.status(204).end();
    } catch (error) {
        next(error); 
    }
});

// app.use((request, response) => {
//     response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
// })

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})