
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import connectCloudinary from './config/cloudinary.js'
import connectdb from './config/connectdb.js'
import userRoute from './routes/userRoute.js'
import productRout from './routes/productRout.js'
const port = process.env.PORT || 4000



let app = express()
app.use(cors())
app.use(express.json())
app.use('/api/user' , userRoute)
app.use('/api/product' ,  productRout)
dotenv.config()
connectdb()
connectCloudinary()

app.get('/', (req, res) => {
    res.send("api working")
})
app.listen(port, () => (
    console.log("server running on port " + " " + port )
))