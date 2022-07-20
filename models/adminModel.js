const mongoose = require('mongoose');

const AdminUser = mongoose.Schema({
    namaadmin: {
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

module.exports = mongoose.model('data-admin', AdminUser);