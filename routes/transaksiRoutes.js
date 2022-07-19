// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import { getTransaksi, getTransaksiById, saveTransaksi, updateTransaksi, deleteTransaksi } from '../controllers/transaksiController.js';
// import { verifyToken } from '../middleware/verifyToken.js';

const express = require('express');
const multer = require('multer');
const path = require('path');
const transaksi = require('../controllers/transaksiController.js');
// const { verifyToken } = require('../middleware/verifyToken.js')
const jwtToken = require('../controllers/refreshToken.js');


const router = express.Router();
router.use(express.static(path.join("assets")))


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './tmp/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

const upload = multer({ storage: storage })

router.get('/', transaksi.getTransaksi);
router.get('/:id', transaksi.getTransaksiById);
router.post('/save', upload.single('img'), transaksi.saveTransaksi);
router.patch('/update/:id', transaksi.updateTransaksi);
router.delete('/delete/:id', transaksi.deleteTransaksi);

module.exports = router;