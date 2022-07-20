const { updateUser, deleteUser, getUser, subscribeUser, unSubscribeUser, addLike, addDislike } = require('../controllers/user');

const express = require('express');
const verifyToken = require('../verifyToken');

const router = express.Router();

//update user
router.put('/:id', verifyToken, updateUser);

//delete user
router.delete('/:id', verifyToken, deleteUser);

//get a user
router.get('/find/:id', getUser);

//subscribe a user
router.put('/sub/:id', verifyToken, subscribeUser);

//unsubscribe a user
router.put('/unsub/:id', verifyToken, unSubscribeUser);

//like the video
router.put('/like/:videoId', verifyToken, addLike);

//dislike the video
router.put('/dislike/:videoId', verifyToken, addDislike)

module.exports = router;