
import { v2 as cloudinary } from 'cloudinary'
import productmodel from '../models/productmodel.js'

//add product
async function addproduct(req, res) {

    try {
        let { name, sizes, description, category, subcategory, bestseller, price } = req.body
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        let allimages = [image1, image2, image3, image4].filter((item) => (item !== undefined))

        console.log(name, sizes, description, category, subcategory, bestseller, price)


        console.log(allimages)
        let imageURL = await Promise.all(
            allimages.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url
            })


        )


        let product_INFO = {
            name,
            price: Number(price),
            description,
            category,
            subcategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imageURL,
            Date: Date.now()
        }
        let product = new productmodel(product_INFO)
        await product.save()
        res.json({ success: true, message: "product add successfuly" })

    }
    catch (err) {
        console.log(err.message)
        res.json({ success: false, message: err.message })
    }
}


//all list products
async function allproduct(req, res) {
    try {

        let allproducts = await productmodel.find({})
        console.log(allproducts)
        res.json({ success: true, allproducts })
    } catch (err) {
        res.json({ success: false, message: err.message })
        console.log(err.message)
    }

}

//remove product
async function removeproduct(req, res) {
    try {
        console.log(req.body.id)
        await productmodel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "product deleted successfuly" })
    } catch (err) {
        res.json({ success: false, message: err.message })
    }

}


//single product
async function singleproduct(req , res) {
try{
    let {productId} = req.body
     let productdetail = await productmodel.findById({_id:productId})
     res.json({success:true , productdetail})
}catch(err){
       res.json({ success: false, message: err.message })
    
}
}
export { singleproduct, allproduct, addproduct, removeproduct }