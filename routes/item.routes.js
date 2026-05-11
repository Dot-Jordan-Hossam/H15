const express = require('express');
const itemRouter= express.Router();
const itemController = require('../controllers/item.controller');

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

// ================= ITEM ROUTES =================

itemRouter.post('/item/createItem', authMiddleware, adminMiddleware, itemController.createItem);
itemRouter.get('/item/getAllItems', itemController.getAllItems);
itemRouter.get('/item/getByID/:id', itemController.getSingleItem);
itemRouter.put('/item/updateItem/:id',authMiddleware, adminMiddleware, itemController.updateItem);
itemRouter.delete('/item/deleteItem/:id',authMiddleware, adminMiddleware, itemController.deleteItem);

module.exports = itemRouter;