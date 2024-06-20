const express = require('express');
const { signUpUser,loginUser,getUsernames ,getUserIdFromToken} = require('../controller/UserController.js');
const {authenticate}=require("../middleware/auth.js")
const Userouter = express.Router();

Userouter.post('/signup', signUpUser);
Userouter.post('/login',loginUser)
Userouter.get('/getUsers', authenticate, getUsernames)
Userouter.get('/getUsername',authenticate,getUserIdFromToken)

module.exports = Userouter;