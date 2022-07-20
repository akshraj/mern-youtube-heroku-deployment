const express = require('express');
const { createVideo, updateVideo, deleteVideo, getVideo, updateView, getRandomVideos, getTrendingVideos, getSubChannelsVideos, getByTag, search, addLike, addDislike } = require('../controllers/video');
const verifyToken = require('../verifyToken');

const router = express.Router();

//create a video
router.post('/', verifyToken, createVideo);

//update a video
router.put('/:id', verifyToken, updateVideo);

//delete a video
router.delete('/:id', verifyToken, deleteVideo);

//get a video
router.get('/find/:id', getVideo);

//update view
router.put('/view/:id', updateView);
router.get('/trending', getTrendingVideos);
router.get('/random', getRandomVideos);

//get subscribed channel's videos
router.get('/sub', verifyToken, getSubChannelsVideos);

//search by tags
router.get('/tags', getByTag);

//search by query text
router.get('/search', verifyToken, search);

module.exports = router;