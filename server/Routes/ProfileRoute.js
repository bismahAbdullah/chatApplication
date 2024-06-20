const express = require('express');
const {  getProfileInfo, updateProfile, updateEmailAndPhone} = require('../controller/ProfileController.js');
const ProfileRouter = express.Router();

ProfileRouter.get('/getProfileInfo/:username', getProfileInfo);
ProfileRouter.put('/updateProfile/:username',updateProfile)
ProfileRouter.put('/updateProfileEmail/:username',updateEmailAndPhone)


module.exports = ProfileRouter;