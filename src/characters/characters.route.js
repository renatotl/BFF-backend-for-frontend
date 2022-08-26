const router = require('express').Router();

const charactersController = require('./characters.controller'); // where is the data we get
const authMiddleware = require('../auth/auth.middleware'); // only who is logged in will be able to create a new character

//we call the authenticator first and then controller
router.get('/', charactersController.findAllCharactersController);
router.post('/create', authMiddleware, charactersController.createCharacterController);
router.get('/find/:id', authMiddleware, charactersController.findCharacterByIdController);
router.put("/update/:id",authMiddleware,charactersController.updateCharacterController);
router.delete("/delete/:id",authMiddleware,charactersController.deleteCharacterController);
router.get('/search', authMiddleware, charactersController.searchCharacterController);
//Let's add the like route:
// router.patch('/:id/like', authMiddleware, charactersController.likecharactersController);
//It will be a patch because we are going to modify only one field in the document and not the entire field.

// router.patch(
//   '/:id/retweet',
//   authMiddleware,
//   charactersController.retweetcharactersController,
// );
//It will be a patch because we are going to modify only one field in the document and not the entire field

module.exports = router;
