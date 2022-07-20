const express = require('express');
const jwtToken = require('../controllers/refreshToken.js');
const logout = require('../controllers/logoutController.js');
const userId = require('../controllers/userController.js');
const login = require('../controllers/loginController.js')

const router = express.Router();

router.post('/', login.userLogin);
router.get('/:id', userId.getUserById);
router.get('/', jwtToken.refreshToken); 
router.delete('/', logout.userLogout);   


module.exports = router