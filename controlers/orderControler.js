import orderModel from "../models/ordermodel.js"
import usermodel from "../models/usermodel.js"
import mongoose from 'mongoose'
import Razorpay from 'razorpay'

import dotenv from 'dotenv'
dotenv.config()

let rzorpayInstance =  new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,

})




let placeorder = async (req, res) => {


    try {
        const { userId, items, amount, address } = req.body
        let createOrder = {
            userId,
            items,
            amount,
            address,
            orderStatus: "Order Placed",
            paymentMethod: "COD",
            payment: false,
            date: Date.now()

        }

        let neworder = new orderModel(createOrder)
        await neworder.save()
        await usermodel.findByIdAndUpdate(userId, { cartData: {} })
        console.log('done')
        res.json({ success: true, message: 'Order Successful' })

    } catch (err) {
        res.json({ success: false, messsage: err.message })
    }

}
let placeorderRazorpay = async (req, res) => {
  try {

    const { userId, items, amount, address } = req.body

    let createOrder = {
      userId,
      items,
      amount,
      address,
      orderStatus: "Order Placed",
      paymentMethod: "razorpay",
      payment: false,
      date: Date.now()
    }

    let neworder = new orderModel(createOrder)
    await neworder.save()

    let options = {
      amount: amount * 100,
      currency: "INR",
      receipt: neworder._id.toString()
    }

    const orderinfo = await rzorpayInstance.orders.create(options)

    res.json({ success: true, orderinfo })

  } catch (err) {
    res.json({ success: false, message: err.message })
  }
}


let verifyrazorpayPayment = async (req , res)=>{
try{
        let {userId , razorpay_order_id} = req.body
    let orderinfo = await rzorpayInstance.orders.fetch(razorpay_order_id)
    console.log(orderinfo)
    if(orderinfo.status === 'paid'){
        await orderModel.findByIdAndUpdate(orderinfo.receipt ,{payment:true})
        await usermodel.findByIdAndUpdate(userId , {cartData : {}})
        
    res.json({success : true ,message:"Payment successful"})
    }else{
       res.json({success:false , message : "Payment failed"})
    }
}catch(err){
    res.json({success:false , message:err.message})
}
}






let placeorderStripe = async (req, res) => {

}


let updateStatus = async (req, res) => {

    try{
        
    let {orderId , status} = req.body
   
    let statusChanged = await orderModel.findByIdAndUpdate({_id :new  mongoose.Types.ObjectId(orderId)} , {orderStatus : status})
    res.json({success : true , statusChanged})

    }catch(err){
        res.json({success:false , messsage : err.message})

    }

}


let userOrders = async (req, res) => {

    try {
        let { orderId } = req.body
        console.log(orderId)
        let userOrder = await orderModel.find({orderId})
        res.json({ success: true, userOrder })

    } catch (err) {
        res.json({ success: false, message: err.message })
    }
}


let list = async (req, res) => {

    try{
        let orders = await orderModel.find({})
        res.json({success : true , orders})

    }catch(err){
        res.json({success : false , message : err.message})

    }
    

}


export {verifyrazorpayPayment, placeorder, placeorderRazorpay, placeorderStripe, updateStatus, userOrders, list }