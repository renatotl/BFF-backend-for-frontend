const userService = require('./users.service'); //bring to here our users.service
const authService = require('../auth/auth.service'); // bring to here our auth.service

const createUserController = async (req, res) => {
  // doing create
  const { name, username, email, password, avatar } = req.body; //we make a const by destructuring our fields

  //validation and treat errors
  if (!username || !name || !email || !password || !avatar) {
    //if you don't have any of these
    //400 status is bad reuest
    return res
      .status(400)
      .send({ message: 'alguns campos precisam ser preenchidos!' });
  }
  //We will do a validation so that the user does not try to create an account with an email already registered. We invoke a service function that will fetch the given email from the database:

  const foundUser = await userService.findByEmailUsersService(email); // it comes from service
  if (foundUser) {
    //if there exist any user that comes from service
    return res.status(400).send({
      // erro number 400 is bad request
      message: 'user already registred!',
    });
  }
  //if the user do not existe so create one
  const user = await userService
    .createUsersService(req.body)
    .catch((err) => console.log(err.message));

  if (!user) {
    //if there is no user
    return res.status(400).send({
      // erro number 400 is bad request
      message: 'Error when trying to create user!',
    });
  }

  const token = authService.generateToken(user.id);

  res.status(201).send({
    user: {
      id: user,
      name,
      username,
      email,
      avatar,
    },
    token, //send the token that was created
  });
};

// All user's route
const findAllUserController = async (req, res) => {
  const users = await userService.findAllUsersService();

  if (users.length === 0) {
    return res.status(400).send({
      message: 'There is no user registred!',
    });
  }

  res.send(users);
};

module.exports = {
  createUserController,
  findAllUserController,
};

//ERROR is handled in the controller
// users.service contains our business rules
