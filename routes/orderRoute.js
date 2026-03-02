
import express from 'express'
import userVerify from '../middleware/userVerify.js'
import verifyAdmin from '../middleware/verifyAdmin_middleware.js'

let orderRout = express.Router()

import {placeorder , placeorderRazorpay ,placeorderStripe , updateStatus ,userOrders , list} from '../controlers/orderControler.js'

orderRout.post('/placeorder' , userVerify , placeorder)
orderRout.post('/placeorderRazorpay', userVerify ,placeorderRazorpay)
orderRout.post('/placeorderStripe', userVerify ,placeorderStripe)
orderRout.post('/userOrders', userVerify ,userOrders)

// admin order routes

orderRout.post('/updateStatus' , verifyAdmin , updateStatus)
orderRout.post('/list' , verifyAdmin, list)


export default orderRout