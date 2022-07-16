import mongoose from "mongoose";

const User = mongoose.Schema({
    namalengkap: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    alamat: {
        type: String,
        required: true,
    },
    nomorhp: {
        type: String,
        required: true,
    },
    refresh_token: {
        type: String,
    }    
});

export default mongoose.model('data-pengguna', User);