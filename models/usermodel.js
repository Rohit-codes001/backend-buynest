import mongoose from "mongoose";

let userShema = new mongoose.Schema({
    name:{type:String, required : true},
    email:{type:String , required: true},
    password : { type: String , required: true},
    cartData : {type: Object , default : {}},
    
},{minimize : false})

let usermodel = mongoose.models.user || mongoose.model('user' , userShema)
export default usermodel