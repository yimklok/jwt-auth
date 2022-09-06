import jwt from "jsonwebtoken";

const auth = (req,res,next)=>{
    try {
        const token = req.header("Authorization")
        if(!token) res.status(500).json({msg: "Invalid Authorization"})

        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err) res.status(500).json({msg: "Invalid Authorization"})
            req.user = user 
            next()
        })
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}
export default auth

// export const verifyToken = (req,res,next)=>{
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]

//     if (token == null) return res.sendStatus(401)

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decorded) => {
//         if (err) return res.sendStatus(403)
        
//         req.email = decorded.email
    
//         next()
//     })
// }