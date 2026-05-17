const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Item = require('../models/item')


const api = supertest(app)

const initialItems = [
  { "id": "6a00d99970bde92b094ba3af", "title": "JBL Flip 6", "description": "Waterproof Bluetooth speaker", "price": 120, "category": "Audio", "rating": 4.6 }, { "id": "6a00d99970bde92b094ba3ac", "title": "Dell UltraSharp 27\"", "description": "4K USB-C Monitor", "price": 550, "category": "Computers", "rating": 4.5 }, { "id": "6a00d99970bde92b094ba3aa", "title": "Sony WH-1000XM5", "description": "Over-ear wireless headphones", "price": 348, "category": "Audio", "rating": 4.6 }, { "id": "6a00d99970bde92b094ba3a8", "title": "iPhone 15", "description": "128GB, Midnight", "price": 799, "category": "Phones", "rating": 4.7 }, { "id": "6a00d99970bde92b094ba3ab", "title": "Logitech MX Master 3S", "description": "Wireless ergonomic mouse", "price": 99, "category": "Accessories", "rating": 4.8 }, { "id": "6a00d99970bde92b094ba3ae", "title": "Samsung Galaxy S24", "description": "256GB, Phantom Black", "price": 850, "category": "Phones", "rating": 4.4 }, { "id": "6a00d99970bde92b094ba3a7", "title": "MacBook Pro", "description": "14-inch, M3 Pro chip", "price": 1999, "category": "Computers", "rating": 4.8 }, { "id": "6a00d99970bde92b094ba3a9", "title": "AirPods Pro", "description": "Noise cancelling earbuds", "price": 249, "category": "Audio", "rating": 4.9 }, { "id": "6a00d99970bde92b094ba3ad", "title": "Anker Power Bank", "description": "20,000mAh portable charger", "price": 45, "category": "Accessories", "rating": 4.2 }, { "id": "6a0244b98f015fed9f261b31", "title": "Samsung 65\" QLED TV", "description": "4K Smart Television", "price": 1199, "category": "Electronics", "rating": 4.7 }, { "id": "6a0244b98f015fed9f261b39", "title": "Bose Smart Soundbar 600", "description": "Dolby Atmos smart soundbar", "price": 499, "category": "Audio", "rating": 4.7 }, { "id": "6a0244b98f015fed9f261b32", "title": "Kindle Paperwhite", "description": "Waterproof e-reader, 16GB", "price": 159, "category": "Electronics", "rating": 4.8 }, { "id": "6a0244b98f015fed9f261b2c", "title": "PlayStation 5", "description": "825GB next-gen gaming console", "price": 499, "category": "Consoles", "rating": 4.9 }, { "id": "6a0244b98f015fed9f261b2f", "title": "Philips Air Fryer XXL", "description": "Smart air fryer with rapid air technology", "price": 299, "category": "Household", "rating": 4.7 }, { "id": "6a0244b98f015fed9f261b34", "title": "Canon EOS R50", "description": "Mirrorless camera with 18-45mm lens", "price": 899, "category": "Cameras", "rating": 4.7 }, { "id": "6a0244b98f015fed9f261b2d", "title": "Xbox Series X", "description": "1TB gaming console", "price": 499, "category": "Consoles", "rating": 4.7 }, { "id": "6a0244b98f015fed9f261b30", "title": "iRobot Roomba j7+", "description": "Self-emptying robot vacuum", "price": 599, "category": "Household", "rating": 4.5 }, { "id": "6a0244b98f015fed9f261b37", "title": "Apple Watch Series 9", "description": "GPS smartwatch, 45mm", "price": 429, "category": "Wearables", "rating": 4.8 }, { "id": "6a0244b98f015fed9f261b38", "title": "Nespresso Vertuo Next", "description": "Coffee and espresso machine", "price": 189, "category": "Household", "rating": 4.4 }, { "id": "6a0244b98f015fed9f261b33", "title": "GoPro HERO12", "description": "5.3K waterproof action camera", "price": 399, "category": "Cameras", "rating": 4.6 }, { "id": "6a0244b98f015fed9f261b2b", "title": "Nintendo Switch OLED", "description": "Handheld gaming console, white edition", "price": 349, "category": "Consoles", "rating": 4.8 }, { "id": "6a0244b98f015fed9f261b2e", "title": "Dyson V15 Detect", "description": "Cordless vacuum cleaner with laser detection", "price": 749, "category": "Household", "rating": 4.8 }, { "id": "6a0244b98f015fed9f261b35", "title": "Razer BlackWidow V4", "description": "Mechanical RGB gaming keyboard", "price": 169, "category": "Accessories", "rating": 4.5 }, { "id": "6a0244b98f015fed9f261b36", "title": "TP-Link Deco XE75", "description": "Wi-Fi 6E mesh router system", "price": 379, "category": "Networking", "rating": 4.6 }
]

test('items are returned as json', async () => {
  await api
    .get('/api/items')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

beforeEach(async () => {
  await Item.deleteMany({})

  for (const item of initialItems) {
    let itemObject = new Item(item)
    await itemObject.save()
  }
})


test('all items are returned', async () => {
  const response = await api.get('/api/items')

  assert.strictEqual(response.body.length, initialItems.length)
})

test('a specific item is within the returned items', async () => {
  const response = await api.get('/api/items')

  const titles = response.body.map(i => i.title)
  assert.strictEqual(titles.includes('MacBook Pro'), true)
})

test('a new item can be added ', async () => {
  const newItem = {
    title: "Sony PlayStation VR2",
    description: "Next-generation virtual reality headset",
    price: 549,
    category: "Consoles",
    rating: 4.5
  }

  await api
    .post('/api/items')
    .send(newItem)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/items')
  const titles = response.body.map(i => i.title)

  assert.strictEqual(response.body.length, initialItems.length + 1)
  assert(titles.includes(newItem.title))
})


after(async () => {
  await mongoose.connection.close()
})