const User = require("../Schemas/user.models")
const genToken = require("../Utils/generateToken")

const register = async (req, res) => {
    try {

        const { name, email, password, role } = req.body
        // console.log(req.body);
        
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                sucess: false
            })
        }

        const userPresent = await User.findOne({ email })

        if (userPresent) {
            return res.status(400).json({
                message: "User Already registered ! please use another email",
                sucess: false
            })
        }

        const result = await User.create({
            name, email, password, role
        })
        // console.log(result);

        return res.status(200).json({
            message: "Registration Sucessfull",
            sucess: true,
            // result : result
        })

    } catch (error) {

        return res.status(500).json({ "msg": "Internal Server Error :-", error: error.message })

    }
}


const login = async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                sucess: false
            })
        }

        const findUser = await User.findOne({ email })

        if (!findUser) {
            return res.status(400).json({
                message: "Incorrect email or password",
                sucess: false
            })
        }

        const passwordMatch = await findUser.comparePassword(password)

        if (!passwordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                sucess: false
            })
        }

        const payload = {
            _id: findUser._id,
            name: findUser.name,
            email: findUser.email,
            role: findUser.role
        }
        const token = await genToken(payload)
        // console.log(token);

        const options = {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            // secure:false,
            sameSite:"none"
        }

        const userDetails = {
            _id: findUser._id,
            name: findUser.name,
            email: findUser.email,
            role: findUser.role
        }

        return res.status(200).cookie(findUser.role === "user" ? "setUserCookie" : "setAdminCookie", token, options).json({
            message: `Welcome back ${findUser.name}`,
            sucess: true,
            token: token,
            user: userDetails
        })

        

    } catch (error) {

        return res.status(500).json({ "msg": "Internal Server Error :-", error: error.message })

    }
}


const logout = async (req, res) => {
    try {
        // console.log('myyyyyyyyyyyyyyyyyyyyyyyyy',req.cookies.setUserCookie);

        const options = {
            maxAge: 0,
            httpOnly: true,
            // secure:false,
            sameSite:"none"
        }

        return res.status(200).clearCookie(req.user.role === "user" ? "setUserCookie" : "setAdminCookie", options).json({
            message: 'Logout Sucessfully',
            sucess: true,
        })

    } catch (error) {

        res.status(500).json({ "msg": "Internal Server Error :-", error })

    }
}


const profile = async (req, res) => {
    try {

        const user = req.user
        // console.log('myyyyyyyyyyyyyyyyyyyyyyyyy',req.cookies.setAdminCookie);

        return res.status(200).json({
            user: user,
            sucess: true,
        })

    } catch (error) {

        return res.status(500).json({ "msg": "Internal Server Error :-", error })

    }
}


module.exports = { register, login, profile, logout }