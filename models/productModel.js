import mongoose from "mongoose";

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
    
    // img: {
    //     type: String,
    //     data: Buffer,
    //     required: true
    // },

    // url: {
    //     type: String,
    // }
});

export default mongoose.model('data-produk', Produk);