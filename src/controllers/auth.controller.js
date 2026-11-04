 
 const userModel = require("../models/user.model")
 const bcrypt = require("bcryptjs")
 const jwt = require("jsonwebtoken")
 const cookieParser = require("cookie-parser")
const TokenBlacklistModel = require("../models/tokenBlacklist.model")


 const registerUser = async (req, res) => {

        const { username, email, password } = req.body;

   if (!username || !email || !password) {
     return res.status(400).json({ message: 'Please provide username, email, and password' });
   }

   const IsUserAlreadyExists = await userModel.findOne(
    { $or: [{ username }, { email }] });

if(IsUserAlreadyExists){
    return res.status(400).json({message:"User already exists with this username or email"})
}

const hash = await bcrypt.hash(password, 10);

const user = userModel.create({
    username,
    email,
    password: hash
});

const token = jwt.sign({ id: user._id ,username : user.username}, process.env.JWT_SECRET, { expiresIn: '1d' });

res.cookie('token', token); 
 
res.status(201).json({
     message: 'User registered successfully',
      user: { 
        username: user.username,
         email: user.email , 
        userId: user._id } });


   }

const login = async (req,res)=>{

    const {email,password} = req.body

    const user = await userModel.findOne({email})

    if (!user){
        return res.status(400).json({message :"User with this Email does not exists"})
    }

    const isPasswordValid =await bcrypt.compare(password , user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message :"Invalid Password"
        })
    }

const token = jwt.sign({id: user._id, username :user.username},process.env.JWT_SECRET,{expiresIn:"1d"})


res.cookie("token",token);

res.status(200).json({
    message :"User logged In successfully",
    user:{
        username: user.username,
         email: user.email , 
        userId: user._id } }

    
)


}

const logout = async(req,res)=>{

    const token = req.cookies.token
   

    if(token){

        await TokenBlacklistModel.create({
            token
        })

    }

    res.clearCookie('token')

            res.status(200).json({
                message :" User logged out succesfully"
            })



}


const getMe = async (req,res)=>{

const user = await userModel.findById(req.user.id)

if (!user){
    return res.status(400).json({message :"User with this ID does not exists"})
}

res.status(200).json({
    message :"User fetched successfully",
    user:{
        username: user.username,
         email: user.email , 
        userId: user._id } }    
)

}

   module.exports = { registerUser ,login ,logout ,getMe }