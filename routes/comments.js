const express = require('express');
const { addComment, getComments, deleteComment } = require('../controllers/comments');
const verifyToken = require('../verifyToken');

const router = express.Router();

//add comment
router.post('/', verifyToken, addComment);

//get comments
router.get('/:videoId', getComments);

//delete comment
router.delete('/:id', verifyToken, deleteComment);

module.exports = router;