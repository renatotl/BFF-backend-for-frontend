const route = require('express').Router(); //bring our express
const swaggerUi = require('swagger-ui-express'); // putting swagger-ui-express inside our variavel swaggerUi
const swaggerDocument = require('./swagger.json'); // putting our swagger.json document inside swaggerDocument

//building our swagger's route
route.use('/', swaggerUi.serve);
route.get('/', swaggerUi.setup(swaggerDocument));

//exporting
module.exports = route;
