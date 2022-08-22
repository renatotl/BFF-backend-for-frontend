// our serve will acess mongodb

const Tweet = require("./Tweet");// bring Tweet to here

const createTweetService = (message, userId) => {
   return Tweet.create({message, user: userId});// we can do it inline

};

//.sort({ _id: -1 }) sort our tweets on the front 
//.populate("user") default function tweets come with user

const findAllTweetsService = (offSet, limit) => Tweet.find().sort({_id: -1 }).skip(offSet).limit(limit).populate("user");// the number of limit() shows the number of tweets to be displayed
// sort sorts the list by throwing the last items up. skip() skips the current 5 tweets and limit shows the next 5


//countDocuments is a mongoose function that brings up how many docs there are
const countTweets = () => Tweet.countDocuments();


//$regex: `${message || ""}` Provides regular expression capabilities for pattern-matching strings in queries.
const searchTweetService = (message) =>Tweet.find({
    message: { $regex: `${message || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user")



    // NIN I want to know if the "likes.userId" if no connector user or created something. if the user has not already liked this tweet
    const likesService = (id, userId) =>  
    Tweet.findOneAndUpdate({
        _id: id,
        "likes.userId": { $nin: [userId]}
    },
    {// If it's the first like, let's push the array with the user's id and the like date:

      $push: {// create the likes field:
          likes: { userId, created: new Date() }// record the date that the like was given
      }
  },
  {//And finally, we need to put a rawResult: true for MongoDB to return the result of the above procedures:
    rawResult: true,// return the raw mongoDB result
},
);

const retweetsService = (id, userId) =>
Tweet.findOneAndUpdate({
    _id: id,
    "retweets.userId": { $nin: [userId]}

},
{

  $push: {
      retweets: { userId, created: new Date() }
  }
},
{    

rawResult: true,
},
);


const commentsService = (id, userId) =>  
Tweet.findOneAndUpdate({
    _id: id,
    // "comments.userId": { $nin: [userId]}

},
{

  $push: {
      retweets: { userId, created: new Date() }
  }
},
{    

rawResult: true,
},
);

module.exports = { 
    createTweetService,
    findAllTweetsService,
    searchTweetService,
    likesService,
    retweetsService,
    commentsService,
    countTweets
   }


   