// import express from 'express';
// import { getProduk, getProdukById, saveProduk, updateProduk, deleteProduk } from '../controllers/produkController.js';
// import { getBuyingById } from '../controllers/buyingController.js'
// import { verifyToken } from "../middleware/verifyToken.js";

const express = require('express');
// const { getProduk, getProdukById, saveProduk, updateProduk, deleteProduk } = require('../controllers/produkController.js');
const product = require('../controllers/produkController.js')
const getBuyingById = require('../controllers/buyingController.js');
const jwtToken = require('../middleware/verifyToken.js');

const router = express.Router();
router.get('/buying/:id', jwtToken.verifyToken, product.getProdukById);


// export default router;

module.exports = router;