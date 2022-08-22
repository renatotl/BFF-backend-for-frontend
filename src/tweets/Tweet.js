const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({
  user: {
    // who is logged in // relating table in mongoose
    type: mongoose.Schema.Types.ObjectId, // user id
    ref: 'User', // references the user table
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  likes: {
    type: Array,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
  retweets: {
    type: Array,
    required: true,
  },
});

const Tweet = mongoose.model('Tweet', TweetSchema);

module.exports = Tweet;
