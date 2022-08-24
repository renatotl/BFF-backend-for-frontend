require('dotenv').config(); // fot deploy in heroku
const express = require('express'); // bring express to here
const cors = require('cors'); // bring here cors
const connectToDatabase = require('./database/database'); //bring here database

const userRoute = require('./users/users.route'); //bring here users
const authRoute = require('./auth/auth.route'); //bring here auth
const charactersRoute = require('./characters/characters.route'); //bring here characters
const swaggerRoute = require('./swagger/swagger.route'); //bring here swagger

const port = process.env.PORT || 3001; // we will use door number 3001 because door number 3000 is from frontend.
const app = express(); // app will receve express

connectToDatabase(); // it will connect to database at begin
app.use(cors());
app.use(express.json()); //our backend will recognize json. For exemple when we send information throw Thunder Client by json

app.use('/users', userRoute);
app.use('/auth', authRoute);
app.use('/characters', charactersRoute);
app.use('/api-docs', swaggerRoute);

app.listen(port, () => {
  console.log(`Serve working in the door: ${port}`); // it will show us in the terminal wich door we are using
});

//localhost:3001
//swagger: http://localhost:3001/api-docs/