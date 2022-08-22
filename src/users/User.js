const mongoose = require('mongoose'); // import mongoose to here

const bcrypt = require('bcryptjs'); //  our password will be crypted

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // I only will have  username in like this in my databank
  },
  email: {
    type: String,
    required: true,
    unique: true, // I only wll have 1 email like this in my databank
    lowercase: true, // It turn my text in lowercase latter
  },
  password: {
    type: String,
    required: true,
    select: false, // it do not return my password even in findAll
  },
  avatar: {
    type: String,
    required: true,
  },
});

// we cannot write the code bellow in aerofunction!
//before save it will execut a callback fuction
UserSchema.pre('save', async function (next) {
  //the 10 is how many turns are we going to want encryption

  this.password = await bcrypt.hash(this.password, 10); // we are talking about this Shema.
  // this function add a new valuer to the password that it being save .
  next(); // it is a middlerware. if not it will be always run dev
});

const User = mongoose.model('User', UserSchema); // we are passing the userSchema valuer to User

module.exports = User;
