const Produk = require('../models/productModel.js');
const fs = require('fs')

exports.getProduk = async (req,res) => {
    try {
        const products = await Produk.find();
        return res.json(products) 
    } catch (error) {
        return res.status(600).json({message: error.message});
    }
} 

exports.getProdukById = async (req, res) => {
    try {
        const products = await Produk.findById(req.params.id);
        return res.json(products)
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}

exports.getProdukByName = async (req,res) => {
    try {
        const products = await Produk.findOne(req.params.namaproduk);
        res.json(products);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.saveProduk = async (req,res) => {
    try {
        const products = new Produk({
            namaproduk: req.body.namaproduk,
            hargaproduk: req.body.hargaproduk,
            tipeproduk: req.body.tipeproduk,
            deskripsiproduk: req.body.deskripsiproduk,
            img: {
                data: fs.readFileSync('./assets/' + req.file.filename),
                contentType: "image/png"
            }
        });
        products.save()
        return res.status(200).json({ message: products})
    } catch (error) {
        return res.status(401).json({
            message: error.message
        })
    }

}

exports.updateProduk = async (req,res) => {
    try {
        const updateProduct = await Produk.updateOne({_id:req.params.id} , {
            namaproduk: req.body.namaproduk,
            hargaproduk: req.body.hargaproduk,
            tipeproduk: req.body.tipeproduk,
            deskripsiproduk: req.body.deskripsiproduk,
            img: {
                data: fs.readFileSync('./assets/' + req.file.filename ),
                contentType: "image/png"
            }
        })
        return res.status(200).json(updateProduct)
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

exports.deleteProduk = async (req,res) => {
    try {
        const deleteProduct= await Produk.deleteOne({_id:req.params.id});
        return res.status(200).json(deleteProduct)
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}
