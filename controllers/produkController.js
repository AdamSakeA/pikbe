// import Produk from '../models/productModel.js';
// import fs from 'fs'

const Produk = require('../models/productModel.js');
const fs = require('fs')

const getProduk = async (req,res) => {
    try {
        const products = await Produk.find();
        res.json(products) 
    } catch (error) {
        res.status(600).json({message: error.message});
    }
} 

const getProdukById = async (req, res) => {
    try {
        const products = await Produk.findById(req.params.id);
        res.json(products)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const getProdukByName = async (req,res) => {
    try {
        const products = await Produk.findOne(req.params.namaproduk);
        res.json(products);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const saveProduk = async (req,res) => {
    try {
        const products = new Produk({
            namaproduk: req.body.namaproduk,
            hargaproduk: req.body.hargaproduk,
            tipeproduk: req.body.tipeproduk,
            deskripsiproduk: req.body.deskripsiproduk,
            img: {
                data: fs.readFileSync(`./assets/${req.file.filename}`),
                contentType: "image/png"
            }
        });
        products.save()
        res.status(200).json({ message: products})
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }

}

const updateProduk = async (req,res) => {
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
        res.status(200).json(updateProduct)
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const deleteProduk = async (req,res) => {
    try {
        const deleteProduct= await Produk.deleteOne({_id:req.params.id});
        res.status(200).json(deleteProduct)
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// export {getProdukByName, getProduk, getProdukById, saveProduk, updateProduk, deleteProduk };
exports.getProdukByName = getProdukByName
exports.getProduk = getProduk
exports.getProdukById = getProdukById
exports.saveProduk = saveProduk
exports.updateProduk = updateProduk
exports.deleteProduk = deleteProduk