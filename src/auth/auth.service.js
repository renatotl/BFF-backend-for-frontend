const User = require('../users/User');
const jwt = require('jsonwebtoken');

const loginService = (email) =>
  User.findOne({ email: email }).select('+password');
//bring the email through the email // what the password will do it will change from false to true in this search using the User model table

//token function. SING asks for 3 parameters the 1st is the Id, SECRET will hide it. The espire is that it will expirate one day has 86400 seconds
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.SECRET, { expiresIn: 86400 });
};

module.exports = { loginService, generateToken };

// user validation token generator and barring others who do not have the industry standard security jwt token
