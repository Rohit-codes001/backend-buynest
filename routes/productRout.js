import express, { Router } from 'express'
import verifyAdmin from '../middleware/verifyAdmin_middleware.js'

import { singleproduct, allproduct, addproduct, removeproduct } from '../controlers/productFunction.js'
import uplode from '../middleware/multer.js'
const productRout = express.Router()

productRout.post('/add-product',verifyAdmin, uplode.fields([{ name: "image1", maxCount: 1 },{ name: "image2", maxCount: 1 },{ name: "image3", maxCount: 1 },{ name: "image4", maxCount: 1 }]), addproduct)
productRout.post('/remove',verifyAdmin, removeproduct)
productRout.post('/findSingle-product',  verifyAdmin, singleproduct)
productRout.get('/all-products',verifyAdmin ,allproduct)


export default productRout

