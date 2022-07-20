const express = require('express');
const product = require('../controllers/produkController.js')
const getBuyingById = require('../controllers/buyingController.js');
const jwtToken = require('../middleware/verifyToken.js');

const router = express.Router();
router.get('/buying/:id', jwtToken.verifyToken, product.getProdukById);


module.exports = router;