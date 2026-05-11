const express = require('express');
const userRouter = express.Router();
const authController = require('../controllers/auth.controller');


userRouter.post('/register', authController.register);
userRouter.post('/login', authController.login);

module.exports = userRouter;