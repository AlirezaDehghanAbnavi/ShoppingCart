const itemsRouter = require('express').Router()
const Item = require('../models/item')

itemsRouter.get('/', async (request, response, next) => {
  try {
    const items = await Item.find({})
    response.json(items)
  } catch (error) {
    next(error)
  }
})

itemsRouter.get('/info', async (request, response, next) => {
  try {
    const count = await Item.countDocuments({})
    response.send(`
      <p>ShoppingCart has info for ${count} items</p>
      <p>${new Date()}</p>
    `)
  } catch (error) {
    console.log(error)
    response.status(500).send('Error Fetching Data')
  }
})

itemsRouter.get('/:id', async (request, response, next) => {
  try {
    const item = await Item.findById(request.params.id)
    if (item) {
      response.json(item)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

itemsRouter.post('/bulk', async (request, response, next) => {
  try {
    const itemsArray = request.body.items
    const savedItems = await Item.insertMany(itemsArray)
    
    console.log(`Successfully saved ${savedItems.length} products!`)
    response.status(201).json(savedItems)
  } catch (error) {
    console.log('Error saving products:', error.message)
    next(error)
  }
})

itemsRouter.post('/', async (request, response, next) => {
  try {
    const item = new Item({
      title: request.body.title,
      description: request.body.description,
      price: request.body.price,
      category: request.body.category,
      rating: request.body.rating
    })

    const savedItem = await item.save()
    response.status(201).json(savedItem)
  } catch (error) {
    next(error)
  }
})

itemsRouter.put('/:id', async (request, response, next) => {
  try {
    const { title, description, price, category, rating } = request.body
    const item = await Item.findById(request.params.id)
    
    if (!item) {
      return response.status(404).end()
    }

    item.title = title
    item.description = description
    item.price = price
    item.category = category
    item.rating = rating

    const updatedItem = await item.save()
    response.json(updatedItem)
  } catch (error) {
    next(error)
  }
})

itemsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Item.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = itemsRouter