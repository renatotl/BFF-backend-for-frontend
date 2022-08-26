const mongoose = require('mongoose');

const CharactersSchema = new mongoose.Schema({
  user: {
    // who is logged in // relating table in mongoose
    type:mongoose.Schema.Types.ObjectId, // user id
    ref: 'User', // references the user table
    required: false,
  },
  name: {
     type: String,
  },
  imageURL: {
    type: String,
    required: true,
  }
});

const Characters = mongoose.model('characters', CharactersSchema);

module.exports = Characters;
