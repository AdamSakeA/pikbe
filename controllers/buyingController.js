
const Produk = require('../models/productModel.js');

exports.getBuyingById = async (req, res) => {
    try {
        const products = await Produk.findById(req.params.id);
        res.json(products)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
