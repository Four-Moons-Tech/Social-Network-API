const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser, 
    addFriendToUser,
    removeFriend, 
  } = require('../../controllers/userController');

  // /api/users
router.route('/')
.get(getUsers)
.post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser)
.delete(deleteUser).put(updateUser);

// /api/users/:userId/friends/
router.route('/:userId/friends').post(addFriendToUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(removeFriend);
module.exports = router;