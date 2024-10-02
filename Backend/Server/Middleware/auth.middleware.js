const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {

    const token = req.cookies["setUserCookie"] || req.cookies["setAdminCookie"]

    if (!token) {
        return res.status(401).json({
            message: "User not authenticated",
            sucess: true
        })
    }
    // console.log('token', token);

    const decoded = await jwt.verify(token, process.env.SECRET_KEY)

    if (!decoded) {
        return res.status(401).json({
            message: "User not authenticated",
            sucess: true
        })
    }

    req.user = decoded.user
    next()

}

module.exports = auth