import express from 'express'
import { adminLogin, loginUser, registerUser , getallproducts} from '../controlers/controler.js'

const userRoute = express.Router()


userRoute.post('/register' , registerUser)
userRoute.post('/login' , loginUser)
userRoute.post('/admin-pannel' , adminLogin)
userRoute.get('/allproducts', getallproducts)


export default userRoute