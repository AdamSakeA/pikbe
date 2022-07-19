// import express from 'express';
// import { registerUser } from '../controllers/registerController.js';

const express = require('express')
const register = require('../controllers/registerController.js')

const router = express.Router()

router.post("/", register.registerUser);

// export default router;
module.exports = router