import Transaksi from '../models/transaksiModel.js';
import fs from 'fs'

const getTransaksi = async (req, res) => {
    try {
        const transaksi = await Transaksi.find();
        res.json(transaksi)
    } catch (error) {
        res.status(600).json({message: error.message});
    }
}

const getTransaksiById = async (req, res) => {
    try {
        const transaksi = await Transaksi.findById(req.params.id);
        res.json(transaksi)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}


const saveTransaksi = async (req,res) => {
    try {
        const transaksi = new Transaksi({
            namauser: req.body.namauser,
            alamatuser: req.body.alamatuser,
            nomorhpuser: req.body.nomorhpuser,
            namaproduk: req.body.namaproduk,
            hargaproduk: req.body.hargaproduk,
            jumlahproduk: req.body.jumlahproduk,
            tipeproduk: req.body.tipeproduk,
            totalharga: req.body.totalharga,
            img: {
                data: fs.readFileSync(`./tmp/transaksi/${req.file.filename}`),
                contentType: "image/png"
            }
        });
        transaksi.save()
        res.status(200).json({ message: transaksi})
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }

}

const updateTransaksi = async (req, res) => {
    try {
        const updateTransaksi = await Transaksi.updateOne({_id:req.params.id} , {$set: req.body})
        res.status(200).json(updateTransaksi)
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const deleteTransaksi = async (req,res) => {
    try {
        const deleteTransaksi = await Transaksi.deleteOne({_id:req.params.id});
        res.status(200).json(deleteTransaksi);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export { getTransaksi, getTransaksiById, saveTransaksi, updateTransaksi, deleteTransaksi };