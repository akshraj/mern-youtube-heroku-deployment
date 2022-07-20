const createError = require("../error");
const Comments = require("../models/Comments");
const Video = require("../models/Video");

const addComment = async (req, res, next) => {
  const newComment = new Comments({ userId: req.user.id, ...req.body });
  try {
    const savedComment = await newComment.save();
    return res.status(200).json(savedComment);
  } catch (err) {
    return next(err);
  }
}

const getComments = async (req, res, next) => {
  try {
    const comments = await Comments.find({ videoId: req.params.videoId });
    return res.status(200).json(comments);
  } catch (err) {
    return next(err);
  }
}

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comments.findById(req.params.id);
    const video = await Video.findById(req.params.id);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comments.findByIdAndDelete(req.params.id);
      return res.status(200).json('The comment has been deleted')
    } else {
      return next(createError(403, "You can delete only your comment!!"));
    }
  } catch (err) {
    return next(err);
  }
}

module.exports = { addComment, getComments, deleteComment }