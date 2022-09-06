import Users from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const useContr = {
    register: async(req,res)=>{
        try {
            const {name,email,password} = req.body
            const user = await Users.findOne({
                where:{
                    email: email
                }
            })
            if(user) return res.status(400).json({msg: "The email already exists."})
            if(password.length<6) return res.status(400).json({msg: "Password is at least 6 characters long."})
            //Passwoed Encryption
            const passwordHash = await bcrypt.hash(password,10)
            //save to database
            await Users.create({
                name:name,
                email:email,
                password:passwordHash
            })
            //then create jsonwentoken to authentication
            const accesstoken = createAccessToken({email: req.body.email})
            const refreshtoken = createRefreshToken({email: req.body.email})

            res.cookie('refreshtoken',refreshtoken,{
                httpOnly: true,
                path: 'user/refresh_token'
            })
            
            res.json({accesstoken})
            // res.json({msg: "Register Success!"})
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    login: async(req,res)=>{
        try {
            const {email,password} = req.body
            const user = await Users.findOne({
                where:{
                    email: email
                }
            })
            if(!user) return res.status(400).json({msg: "User does not exist."})
            const isMath = await bcrypt.compare(password,user.password)
            if(!isMath) return res.status(400).json({msg: "Incorrect password."})
            //if login succeess , create access token and refresh token
            const accesstoken = createAccessToken({email: user.email})
            const refreshtoken = createRefreshToken({email: user.email})
            res.cookie('refreshtoken',refreshtoken,{
                httpOnly: true,
                path: 'user/refresh_token'
            })
            res.json({accesstoken})
            // res.json({msg: "Login Success!"})

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    logout: async(req,res)=>{
        try {
            res.clearCookie('refreshtoken',{path: 'user/refresh_token'})
            res.json({msg: "Loged Out!"})

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    refreshToken: (req,res)=>{
        const rf_token = req.cookies.refreshtoken
        // res.json(rf_token)
        if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})
        jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
            if(err) return res.status(400).json({msg: "Please Login or Register"})
            const accesstoken = createAccessToken({email: user.email})
            res.json({accesstoken})
        })
    },
    getUser: async(req,res)=>{
        try {
            // res.json(req.user)
            const user = await Users.findOne({
                where:{
                    email: req.user.email
                },
                attributes: ['id','name','email']
            })
            if(!user) return res.status(500).json({msg: "User does not exist."})
            res.json(user)
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
}

const createAccessToken = (user) =>{
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn: '1d'})
}
const createRefreshToken = (user) =>{
    return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn: '7d'})
}




/*
    const user = await Users.findAll({
         where:{
            email: req.body.email
        }
    })
    await Users.update({refresh_token: refrestToken},{
         where:{
            id: userId
        }
    })
*/
