import usermodel from "../models/usermodel.js"

let addToCart = async (req , res)=>{
    try{

        

    let {userId ,prodcutId , size } = req.body
    
    let userdata = await usermodel.findById(userId)

    let cartData = await userdata.cartData

    if(cartData[prodcutId]){
        if(cartData[prodcutId][size]){
            cartData[prodcutId][size] += 1
        }else{
            cartData[prodcutId][size] = 1
        }
    }else{
        cartData[prodcutId] = {}
        cartData[prodcutId][size] = 1
    }

    await usermodel.findByIdAndUpdate(userId , {cartData})
    
   res.json({success : true , message : "Add to cart"})
    }catch(err){
        res.json({success : false , message : err.message})

    }

}



let UpdateCart = async (req , res)=>{

    try{
        
    const  {userId , prodcutId , size , quantity} = req.body
      
    let userdata = await usermodel.findById(userId)
    let cartData = await userdata.cartData
    cartData[prodcutId][size] = quantity
    await usermodel.findByIdAndUpdate(userId , {cartData})

    res.json({success : true , message : "cart updated"})
    }catch(err){
        req.json({success:false , message : err.message})
    }
    
}

let getCartData = async(req , res) => {
try{
    
    let {userId} = req.body

    let userdata = await usermodel.findById(userId)

    let cartData = await userdata.cartData
    res.json({success:true , cartData})
}catch(err){
    
        req.json({success:false , message : err.message})

}

    
}

export {addToCart , UpdateCart , getCartData}