const router = require("express").Router();

const tweetController = require("./tweets.controller");// where is the data we get
const authMiddleware = require("../auth/auth.middleware");// only who is logged in will be able to create a new tweet

//we call the authenticator first and then controller
router.post("/create", authMiddleware, tweetController.createTweetController);
router.get("/", authMiddleware, tweetController.findAllTweetsController);
router.get("/search", authMiddleware, tweetController.searchTweetController);
//Let's add the like route:
router.patch("/:id/like", authMiddleware, tweetController.likeTweetController)
//It will be a patch because we are going to modify only one field in the document and not the entire field.

router.patch("/:id/retweet", authMiddleware,tweetController.retweetTweetController);
//It will be a patch because we are going to modify only one field in the document and not the entire field


module.exports = router;

