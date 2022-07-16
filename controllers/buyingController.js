import Produk from '../models/productModel.js'

const getBuyingById = async (req, res) => {
    try {
        const products = await Produk.findById(req.params.id);
        res.json(products)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export {getBuyingById};