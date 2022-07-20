// import express from 'express';
// import multer from 'multer';
// import path from 'path'
// import { getProduk, getProdukByName, getProdukById, saveProduk, updateProduk, deleteProduk } from '../controllers/produkController.js';
// import { verifyToken } from "../middleware/verifyToken.js";
const express = require('express');
const multer = require('multer');
const path = require('path');
const product = require('../controllers/produkController.js')
const jwtToken = require('../middleware/verifyToken.js')

const router = express.Router();
router.use(express.static(path.join("assets")))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

const upload = multer({ storage: storage })

router.get('/', product.getProduk);
router.get('/:id', jwtToken.verifyToken, product.getProdukById);
// // router.get('/product/:id', getProdukByName);
router.post('/', upload.single('img'), product.saveProduk);
router.patch('/:id', upload.single('img'), product.updateProduk);
router.delete('/:id', product.deleteProduk);

module.exports = router;