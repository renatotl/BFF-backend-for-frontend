const authService = require('./auth.service'); //bring us our auth.service
require('dotenv').config(); // it is for deploy on heroku
const bcrypt = require('bcryptjs'); //it will cryptrograph our password

const loginController = async (req, res) => {
  //body request
  const { email, password } = req.body; // receving email and password from body

  const user = await authService.loginService(email); // we are looking for email

  //validing the first authenticator
  if (!user) {
    //if do not exist user
    return res.status(400).send({ message: 'User not found!' });
  }

  //second validation
  //it was necessary to import bcrypt to here
  const isPasswordValid = await bcrypt.compare(password, user.password); // it will compare two params (password) it comes from body (user.password) it is user's password

  if (!isPasswordValid) {
    return res.status(400).send({
      message: 'invalided password!',
    });
  }
  const token = authService.generateToken(user.id);

  res.send({ token });
};

module.exports = { loginController };
