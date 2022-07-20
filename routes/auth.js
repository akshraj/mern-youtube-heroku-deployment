const express = require('express');
const { signIn, signUp, signInWithGoogle, logOut } = require('../controllers/auth');
const verifyToken = require('../verifyToken');

const router = express.Router();

//create a user
router.post('/register', signUp);

//sign in user
router.post('/login', signIn);

//google auth

router.post('/google', signInWithGoogle);

router.post('/logout', verifyToken, logOut);

module.exports = router;