const userDto = require('../dtos/userDto');
const createError = require('../error');
const User = require('../models/User');
const Video = require('../models/Video');

const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      return res.status(200).json(updatedUser);
    } catch (err) {
      return next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
}

const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).json('User is deleted');
    } catch (err) {
      return next(err);
    }
  }
  return next(createError(403, "You can delete only your post"))
}

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(userDto(user));
  } catch (err) {
    return next(err);
  }
}

const subscribeUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      await User.findByIdAndUpdate(req.user.id, {
        $addToSet: { subscribedUsers: req.params.id }
      });

      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: 1 },
      })
      return res.status(200).json("Subscription successful");
    }
    return next(createError(403, "you can not subscribe to yourself"))
  } catch (err) {
    return next(err);
  }
}

const unSubscribeUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id }
    });

    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    })
    res.status(200).json("Subscription successful");
  } catch (err) {
    return next(err);
  }
}

const addLike = async (req, res, next) => {
  const userId = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: userId },
      $pull: { dislikes: userId }
    }, { new: true });
    return res.status(200).json("The video has been liked")
  } catch (err) {
    return next(err);
  }
}

const addDislike = async (req, res, next) => {
  const userId = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $pull: { likes: userId },
      $addToSet: { dislikes: userId }
    }, { new: true });
    return res.status(200).json("The video has been disliked")
  } catch (err) {
    return next(err);
  }
}


module.exports = { updateUser, deleteUser, getUser, subscribeUser, unSubscribeUser, addLike, addDislike };