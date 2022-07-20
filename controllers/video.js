const createError = require('../error');
const Video = require('../models/Video');
const User = require('../models/User');

const createVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    return res.status(200).json(savedVideo);
  } catch (err) {
    return next(err);
  }
}

const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "video not found!"));
    if (video.userId === req.user.id) {
      const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, { new: true })
      return res.status(200).json(updatedVideo);
    }
    return next(createError(403, "you can only update videos uploaded by you"));
  } catch (err) { return next(err); }
}

const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "video not found!"));
    if (video.userId === req.user.id) {
      await Video.findByIdAndDelete(req.params.id);
      return res.status(200).json("Video has been deleted");
    }
    return next(createError(403, "you can only delete videos uploaded by you"));
  } catch (err) { return next(err); }

}

const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "video not found!"));
    return res.status(200).json(video);
  } catch (err) { return next(err); }
}

const updateView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true });
    return res.status(200).json("The view has been increased");
  } catch (err) { return next(err); }
}

const getRandomVideos = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    return res.status(200).json(videos)
  } catch (err) { return next(err); }
}


const getTrendingVideos = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    return res.status(200).json(videos);
  } catch (err) { return next(err); }
}


const getSubChannelsVideos = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannelsList = await Promise.all(
      user.subscribedUsers.map(channelId => {
        return Video.find({ userId: channelId })
      })
    );
    return res.status(200).json(subscribedChannelsList.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) { return next(err) }
}

const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    return res.status(200).json(videos)
  } catch (err) {
    return next(err);
  }
}
const search = async (req, res, next) => {
  const query = req.query.q
  try {
    const videos = await Video.find({ title: { $regex: query, $options: "i" } }).limit(40);
    return res.status(200).json(videos)
  } catch (err) {
    return next(err);
  }
}


module.exports = { createVideo, updateVideo, deleteVideo, getVideo, updateView, getRandomVideos, getTrendingVideos, getSubChannelsVideos, getByTag, search }