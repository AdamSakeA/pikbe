const express = require('express');
const tokenAdmin = require('../controllers/refreshToken.js');
const adminController = require('../controllers/adminController.js');
const verifyToken = require('../middleware/verifyToken.js');



const router = express.Router();
router.post('/', adminController.adminLogin);
router.get('/', tokenAdmin.refreshTokenAdmin); 
router.delete('/', adminController.adminLogout); 

router.post('/admins', adminController.registerAdmin);
router.get('/admins', adminController.getAdmins);
router.delete('/admins', adminController.deleteAdmin)

module.exports = router