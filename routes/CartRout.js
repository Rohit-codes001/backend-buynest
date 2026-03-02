import express from 'express'
let CartRout = express.Router()
import {addToCart , UpdateCart , getCartData} from '../controlers/CartControler.js'
import verifyUser from '../middleware/userVerify.js'

CartRout.post('/add', verifyUser , addToCart)
CartRout.post('/update', verifyUser , UpdateCart)
CartRout.post('/getCart',verifyUser , getCartData)

export default CartRout