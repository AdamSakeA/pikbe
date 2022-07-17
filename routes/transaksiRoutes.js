import express from 'express';
import multer from 'multer';
import path from 'path';
import { getTransaksi, getTransaksiById, saveTransaksi, updateTransaksi, deleteTransaksi } from '../controllers/transaksiController.js';
import { verifyToken } from '../middleware/verifyToken.js';

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

router.get('/transaksi',verifyToken, getTransaksi);
router.get('/transaksi/:id', getTransaksiById);
router.post('/transaksi', upload.single('img'), saveTransaksi);
router.patch('/transaksi/:id', updateTransaksi);
router.delete('/transaksi/:id', deleteTransaksi);

export default router;