const Transaksi = require('../models/transaksiModel.js');
const fs = require('fs')

exports.getTransaksi = async (req, res) => {
    try {
        const transaksi = await Transaksi.find();
        return res.json(transaksi)
    } catch (error) {
        return res.status(600).json({message: error.message});
    }
}

exports.getTransaksiById = async (req, res) => {
    try {
        const transaksi = await Transaksi.findById(req.params.id);
        return res.json(transaksi)
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}


exports.saveTransaksi = async (req,res) => {
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
                data: fs.readFileSync('./tmp/' + req.file.filename),
                contentType: "image/png"
            }
        });
        transaksi.save()
        return res.status(200).json({ message: transaksi})
    } catch (error) {
        return res.status(401).json({
            message: error.message
        })
    }

}

exports.updateTransaksi = async (req, res) => {
    try {
        const updateTransaksi = await Transaksi.updateOne({_id:req.params.id} , {$set: req.body})
        return res.status(200).json(updateTransaksi)
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

exports.deleteTransaksi = async (req,res) => {
    try {
        const deleteTransaksi = await Transaksi.deleteOne({_id:req.params.id});
        return res.status(200).json(deleteTransaksi);
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}
