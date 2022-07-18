// import express from 'express';
// import { getUserLoginById, userLogin } from '../controllers/loginController.js';
// import { refreshToken } from '../controllers/refreshToken.js';
// import { userLogout } from '../controllers/logoutController.js';
// import { getUserById } from '../controllers/userController.js';

const express = require('express');
const { getUserLoginById, userLogin } = require('../controllers/loginController.js');
const { refreshToken } = require('../controllers/refreshToken.js');
const { userLogout } = require('../controllers/logoutController.js');
const getUserById = require('../controllers/userController.js');
const { module } = require('../models/userModel.js');


const router = express.Router();

router.post('/login', userLogin);
router.get('/:id', getUserById);
router.get('/token', refreshToken); 
router.delete('/logout', userLogout);   


// export default router;
module.exports = router