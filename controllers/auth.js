const createError = require('../error');
const User = require('../models/User');
const AuthService = require('../services/authService');
const jwt = require('jsonwebtoken');
const userDto = require('../dtos/userDto');


const signUp = async (req, res, next) => {
  try {
    const hashedPassword = await AuthService.hashedPassword(req.body.password);
    const newUser = new User({ ...req.body, password: hashedPassword });
    const user = await newUser.save();

    // const { password, ...other } = user._doc;
    return res.status(200).json(userDto(user));
  } catch (err) {
    return next(err);
  }
}
const signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      const passwordIsValid = await AuthService.validatePassword(password, user.password);
      if (passwordIsValid) {
        // const { password, ...other } = user._doc;
        return res.cookie("access_token", token, {
          httpOnly: true
        }).status(200).json(userDto(user));
      } else {
        return next(createError(401, "password is not correct"))
      }
    }
    return next(createError(404, 'user not found'));
  } catch (err) {
    return next(err);
  }
}

const signInWithGoogle = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const newUser = new User({ ...req.body, fromGoogle: true });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      return res.cookie("access_token", token, {
        httpOnly: true
      }).status(200).json(userDto(savedUser));
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      return res.cookie("access_token", token, {
        httpOnly: true
      }).status(200).json(userDto(user));
    }
  } catch (error) {
    return next(error);
  }
}


module.exports = { signUp, signIn, signInWithGoogle };