import User from '../models/userModel.js'
import bcrypt from 'bcrypt'

const registerUser = async (req,res) => {
    const { namalengkap, email, password, alamat, nomorhp } = req.body;

    const findUser = await User.findOne({
        email: email,
    })

    const findNumber = await User.findOne({
        nomorhp: nomorhp,
    })

    if(namalengkap, email, password, alamat, nomorhp === "") {
        return res.status(400).json({
            message: "Please Fill The Form!"
        })
    }

    if(findUser) {
        return res.status(400).json({
            message: "Email has been taken"
        })
    }

    if(findNumber) {
        return res.status(400).json({
            message: "Phone Number has been taken"
        })
    }

    const hashPassword = bcrypt.hashSync(password, 5);

    await User.create({
        namalengkap: namalengkap,
        email: email,
        password: hashPassword,
        alamat: alamat,
        nomorhp: nomorhp,
        refresh_token: ""
    })

    res.status(201).json({
        message: "User Registered!"
    })
}

export {registerUser};