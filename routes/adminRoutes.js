// import express from 'express';
// import { refreshTokenAdmin } from '../controllers/refreshToken.js';
// import { adminLogin, adminLogout, deleteAdmin, getAdmins, registerAdmin } from '../controllers/adminController.js';
// import { verifyToken } from '../middleware/verifyToken.js';

const express = require('express');
const refreshTokenAdmin = require('../controllers/refreshToken.js');
const { adminLogin, adminLogout, deleteAdmin, getAdmins, registerAdmin } = require('../controllers/adminController.js');
const verifyToken = require('../middleware/verifyToken.js');



const router = express.Router();
router.post('/loginadmin', adminLogin);
router.get('/tokenadmin', refreshTokenAdmin); 
router.delete('/logoutadmin', adminLogout); 

router.post('/adminregist', registerAdmin);
router.get('/admins',verifyToken, getAdmins);
router.delete('/admin/:id', deleteAdmin)



// export default router;
exports.router = router;