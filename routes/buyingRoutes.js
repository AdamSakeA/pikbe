// import express from 'express';
// import { getProduk, getProdukById, saveProduk, updateProduk, deleteProduk } from '../controllers/produkController.js';
// import { getBuyingById } from '../controllers/buyingController.js'
// import { verifyToken } from "../middleware/verifyToken.js";

const express = require('express');
const { getProduk, getProdukById, saveProduk, updateProduk, deleteProduk } = require('../controllers/produkController.js');
const getBuyingById = require('../controllers/buyingController.js');
const verifyToken = require('../middleware/verifyToken.js');

const router = express.Router();
router.get('/buying/:id', verifyToken, getProdukById);


// export default router;