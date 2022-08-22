const User = require('./User'); // bring our User to here here is from model

//our function recive a value User.findById(idUser); User is our schema and findById will compare both params
const findByIdUserService = (idUser) => User.findById(idUser);

//we are cpmparing both emails
const findByEmailUsersService = (email) => User.findOne({ email: email });
//looking for the email in the backend it returns by findByEmailUserService. findOne is from mongoose

// we recive (body) and second body is it is creating on databank
const createUsersService = (body) => User.create(body); // when it is made inline we do not need return

const findAllUsersService = () => User.find(); // it will bring us all users

module.exports = {
  findByEmailUsersService,
  createUsersService,
  findAllUsersService,
  findByIdUserService,
};
