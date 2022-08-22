const route = require('express').Router();

const authController = require('./auth.controller');

route.post('/login', authController.loginController);

module.exports = route;
