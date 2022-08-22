const route = require('express').Router(); //Router() execute here

const userController = require('./users.controller'); // bring our users.controller to here

route.post('/create', userController.createUserController);
route.get('/', userController.findAllUserController);

module.exports = route;
