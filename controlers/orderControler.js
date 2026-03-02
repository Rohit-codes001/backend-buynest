import orderModel from "../models/ordermodel.js"
import usermodel from "../models/usermodel.js"
import mongoose from 'mongoose'


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


export { placeorder, placeorderRazorpay, placeorderStripe, updateStatus, userOrders, list }