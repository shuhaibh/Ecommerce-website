const express = require('express')
const itemRouter = express.Router()

const { getAllItems } = require('../controllers/itemController')
const { getItemById } = require('../controllers/itemController')
const { createItem } = require('../controllers/itemController')
const { updateItem } = require('../controllers/itemController')
const { deleteItem } = require('../controllers/itemController')


itemRouter.get('/', getAllItems)

itemRouter.get('/:itemId', getItemById)

itemRouter.post('/create', createItem)

itemRouter.patch('/update/:itemId', updateItem)

itemRouter.delete('/delete/:itemId', deleteItem)


module.exports = itemRouter