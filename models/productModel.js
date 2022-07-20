const mongoose = require('mongoose');

const Produk = mongoose.Schema({
    namaproduk: {
        type: String,
        required: true,
    },
    hargaproduk: {
        type: Number,
        required: true
    },
    tipeproduk: {
        type: String,
        required: true
    },
    deskripsiproduk: {
        type: String,
        required: true
    }, 
    img: {
        data: Buffer,
        contentType: String
    }
    
});

module.exports = mongoose.model('data-produk', Produk);