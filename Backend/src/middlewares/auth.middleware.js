 const jwt = require ('jsonwebtoken')
 const TokenBlacklistModel = require("../models/tokenBlacklist.model")


 const authUser = async(req,res,next)=>{

    const token = req.cookies.token

if(!token){
    return res.status(400).json({
        message :"No token found"
    })
} 

istokenBlacklisted = await TokenBlacklistModel.findOne({token})

if(istokenBlacklisted){
    return res.status(400).json({
        message :"Token is blacklisted"
    })
}


try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = decoded
    next()
}   

catch(err){
    return res.status(400).json({
        message :"Invalid token"
    })
}   

 }

 module.exports = {authUser} 