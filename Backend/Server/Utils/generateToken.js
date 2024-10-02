const jwt  = require('jsonwebtoken')

const genToken = async(payload)=>{
    return await jwt.sign({user:payload} , process.env.SECRET_KEY , {expiresIn:"7d"})  

}

module.exports = genToken