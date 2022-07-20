const User = require('../models/userModel.js');

exports.userLogout = async (req,res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);

    const user = await User.find({
        refresh_token: refreshToken
    })

    if(!user) return res.sendStatus(204)
    const userId = user._id;
    await User.updateOne({refresh_token: null}, {userId});
    res.clearCookie('refreshToken');
    res.sendStatus(200);
}


