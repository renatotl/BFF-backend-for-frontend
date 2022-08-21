const tweetService = require('./tweets.service'); // bring to here our tweets.service

const createTweetController = async (req, res) => {
  try {
    // try to do it
    const { message } = req.body; // receving the message in destructure way
    if (!message) {
      res.status(404).send({
        message: 'Send all fill out filds!',
      });
    }
    // getting id in destructure way
    const { id } = await tweetService.createTweetService(message, req.userId);
    // we are inside of a try and we need a return
    return res.send({
      message: 'message created succefull',
      tweet: { id, message },
    });
  } catch (err) {
    // status 500 is: internal serve erro
    res.status(500).send({ message: err.message });
  }
};

const findAllTweetsController = async (req, res) => {
  try {
    let { limit, offSet } = req.quary; //we need to change it and because we receve by quary

    // we need to have sure LIMIT and OFFSET are numbers so we will convert them
    limit = Number(limit);
    offSet = Number(offSet);
    //if there is no limit
    if (!limit) {
      limit = 5;
    }
    //if there is no offset
    if (!offSet) {
      offSet = 0;
    }

    //logic
    const tweets = await tweetService.findAllTweetsService(offSet, limit);

    const total = await tweetService.countTweets(); // it will count how many tweets we have
    //currently frontend's url
    const currentUrl = req.baseUrl;

    const next = offSet + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offSet=${next}` : null;

    const previous = offSet - limit < 0 ? null : offSet - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offSet=${previous}`
        : null;

    if (tweets.length === 0) {
      return res.status(400).send({ message: 'There is no tweets!' });
    }

    return res.send({
      nextUrl,
      previousUrl,
      limit,
      offSet,
      total,

      results: tweets.map((tweet) => ({
        //taking tweet by tweet and doing a new object
        id: tweet._id, // send tweet's id
        message: tweet.message, // send message from this tweet
        likes: tweet.likes.length, // send likes from this tweet
        comments: tweet.comments.length, // sending the size of the likes array
        retweets: tweet.retweets.length, // sending
        name: tweet.user.name, // sending user's name
        username: tweet.user.username, // sending the username of the user inside a tweet
        avatar: tweet.user.avatar, // sending the user's photow
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const searchTweetController = async (req, res) => {
    // this query is because our message is arriving by the total 3000 or 3001
   const { message } = req.query;// we deconstruct the message that arrives from the client
 
   const tweets = await tweetService.searchTweetService(message);
 
   if (tweets.length === 0) {
     return res
       .status(400)
       .send({ message: "There is n tweets with this message!" });
   }
   return res.send({
     tweets: tweets.map((tweet) => ({//taking tweet by tweet and making a new object
        id: tweet._id,// sending tweet id
        message: tweet.message,// sending them msm from this tweet
        likes: tweet.likes.length,// sending the likes of the tweet
        comments: tweet.comments.length,// sending the size of the likes array
        retweets: tweet.retweets.length,// sending
        name: tweet.user.name,// sending the username
        username: tweet.user.username,// sending the username of the user inside a tweet
        avatar: tweet.user.avatar,// sending user photo
      })),
    })

};

const likeTweetController = async (req, res) => {
    const { id } = req.params;// getting the id by parameter
      
    const userId = req.userId;// getting the userId by the parameter
  
    const tweetLiked = await tweetService.likesService(id, userId);
  
    if (tweetLiked.lastErrorObject.n === 0) {
        return res.status(400).send({ message: "You already liked this tweet!"})
    };
   // Finally, we return an answer:
   return res.send({
    message: "Like done successfully!"
  });
  };


  const retweetTweetController = async (req, res) => {
    const { id } = req.params;// getting the id by parameter
      
    const userId = req.userId;// getting the userId by the parameter
  
    const tweetRetweeted = await tweetService.likesService(id, userId);
  
    if (tweetRetweeted.lastErrorObject.n === 0) {
        return res.status(400).send({ message: "You already retweeted this tweet!"})
    };
   // Finally, we return an answer:
   return res.send({
    message: "Successfully retweeted!"
  });
  };

  const commentsTweetController = async (req, res) => {
    const { id } = req.params;// getting the id by parameter
      
    const userId = req.userId;// getting the userId by the parameter
  
    const tweetCommented = await tweetService.commentsService(id, userId);
  
   return res.send({
    message: "Comment successfully completed!"
  });
  };

module.exports = {
    createTweetController,
    findAllTweetsController,
    searchTweetController,
    likeTweetController,
    retweetTweetController,
    commentsTweetController
  }