import express from 'express';
import { getUserLoginById, userLogin } from '../controllers/loginController.js';
import { refreshToken } from '../controllers/refreshToken.js';
import { userLogout } from '../controllers/logoutController.js';
import { getUserById } from '../controllers/userController.js';


const router = express.Router();

router.post('/login', userLogin);
router.get('/login/:id', getUserById);
router.get('/token', refreshToken); 
router.delete('/logout', userLogout);   


export default router;