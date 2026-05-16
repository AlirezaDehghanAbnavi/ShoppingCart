const itemsRouter = require('express').Router()
const Item = require('../models/item')


itemsRouter.get('/', (request, response, next) => {
    Item.find({})
        .then(items => response.json(items))
        .catch(error => next(error))
})


itemsRouter.get('/info', (request, response) => {
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

itemsRouter.get('/:id', (request, response, next) => {
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

itemsRouter.post('/bulk', async (request, response, next) => {
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

itemsRouter.post('/', async (request, response, next) => {
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

itemsRouter.put('/:id', (request, response, next) => {
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

itemsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Item.findByIdAndDelete(request.params.id);
        response.status(204).end();
    } catch (error) {
        next(error); 
    }
});

module.exports = itemsRouter