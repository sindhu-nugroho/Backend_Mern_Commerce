// Rute Sign/Login

const express = require('express');
const router = express.Router();
const { signIn } = require('../controller/AuthController');

// Route Login
router.post('/singin, SignIn');

module.exports = router;