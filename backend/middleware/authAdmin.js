import Users from '../models/userModel.js'

const authAdmin = async(req,res,next)=>{
    try {
        //Get user imfomation by id
        const user = await Users.findOne({
            where:{
                email: req.user.email
            }
        })
        if(user.role === 0) return res.status(400).json({msg: "Admin resource access denied"})

        next()
        
    } catch (error) {
        return res.status(400).json({msg: error.message})
    }
}
export default authAdmin