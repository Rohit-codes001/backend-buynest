import usermodel from '../models/usermodel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


function genratetoken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

// login a user
const loginUser = async (req, res) => {
  let { email, password } = req.body

  let isUser = await usermodel.findOne({ email })

  if (!isUser) {
    return res.json({ success: false, message: "Invalid user" })
  }

  let isMatch = await bcrypt.compare(password, isUser.password)
  if (!isMatch) {
    return res.json({ success: false, message: "Wrong password" })
  }

   const token = genratetoken(isUser._id)
   res.json({success : true , token})




}
// regisetr a user

const registerUser = async (req, res) => {

  let { name, email, password } = req.body

  // cheack user allready exist or not
  let is_email_already = await usermodel.findOne({ email })
  if (is_email_already) {
    return res.json({ success: false, message: "user already exist" })
  }

  if (!validator.isEmail(email)) {
    return res.json({ success: false, message: 'Please Enter a valid email' })
  }
  if (password.length < 8) {
    res.json({ success: false, message: 'Please Enter a stronge password' })
  }
  const hashedpassword = await bcrypt.hash(password, 10)

  const newuser = await usermodel({
    name,
    email,
    password: hashedpassword
  })

  const user = await newuser.save()
  const token = genratetoken(user._id)
  res.json({ success: true, token })




}

// login a admin

const adminLogin = async (req, res) => {

try{
       let {email , password} = req.body
        if(email !== process.env.admin_email && password !== process.env.admin_password){
          res.json({success:false , message:"Something went wrong"})
        }
        let token = jwt.sign(email+password , process.env.JWT_SECRET)
        res.json({success:true , token})
}catch(err){
  res.json({success:false , message:err.message})

}

}

export { loginUser, registerUser, adminLogin }