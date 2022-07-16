import mongoose from "mongoose";

const Transaksi = mongoose.Schema({
    namauser: {
        type: String,
        required: true,
    },
    alamatuser: {
        type: String,
        required: true,
    },
    nomorhpuser: {
        type: String,
        required: true,
    },
    namaproduk: {
        type: String,
        required: true,
    },
    hargaproduk: {
        type: Number,
        required: true,
    },
    jumlahproduk: {
        type: Number,
        required: true,
    },
    tipeproduk: {
        type: String,
        required: true
    },
    totalharga: {
        type: Number,
        required: true,
    },
    img: {
        data: Buffer,
        contentType: String
    }
});

export default mongoose.model('data-transaksi', Transaksi);
