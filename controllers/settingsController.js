import User from "../models/userModel.js"
import bcrypt from 'bcrypt'

const updateUser = async (req,res) => {

    const { namalengkap, email, password, alamat, nomorhp } = req.body;

    const userUpdate = await User.findOne({_id: req.params.id})

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
}

const userLogin = async (req,res) => {
    const { email, password } = req.body;

    const findUser = await User.findOne({
        email : email,
    })

    if(!findUser) {
        return res.status(400).json({
            message: "Email not found"
        })
    }

    const isPasswordValid = bcrypt.compareSync(password, findUser.password)

    if(!isPasswordValid) {
        return res.status(400).json({
            message: "Wrong password"
        })
    }
    
    const userId = findUser._id; 
    const name = findUser.namalengkap;
    const accessToken = jwt.sign({userId, email, name}, process.env.ACCESS_TOKEN_SECRET 
        ,{
        expiresIn: '20s'
        }
        )
    const refreshToken = jwt.sign({userId, email, name}, process.env.REFRESH_TOKEN_SECRET 
        ,{
        expiresIn: '1d'
         }
    )
    await User.updateOne({refresh_token: refreshToken}, userId);
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken, userId, name })
}