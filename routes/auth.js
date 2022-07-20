const express = require('express');
const { signIn, signUp, signInWithGoogle } = require('../controllers/auth');

const router = express.Router();

//create a user
router.post('/register', signUp);

//sign in user
router.post('/login', signIn);

//google auth

router.post('/google', signInWithGoogle);

module.exports = router;