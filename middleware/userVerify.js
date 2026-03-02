import jwt from 'jsonwebtoken'

function verifyUser(req , res , next){
    try{
        let token = req.headers.authorization

    if(!token){
      return  res.json({success : false , message : 'Not authrized login again'})
    }

    let decode_token = jwt.verify(token , process.env.JWT_SECRET)
    
    
    req.body.userId = decode_token.id
   
      next()
      
    }
    catch(err){
    return res.json({ success:false, message: err.message })
}
  

}
 export default verifyUser