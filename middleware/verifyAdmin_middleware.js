import jwt from 'jsonwebtoken'

async function verifyAdmin(req , res , next) {
    let token = req.headers.authrization

    if(!token){
        res.json({success: false , message:"Not authorized admin"})
    }
    let token_decode = jwt.verify(token,process.env.JWT_SECRET)
    if(token_decode !== process.env.admin_email+process.env.admin_password){
        res.json({success:true , message:"Not authrized admin"})
    }
    next()
    
}

export default verifyAdmin