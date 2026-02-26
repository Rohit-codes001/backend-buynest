import multer from "multer";

const storage = multer.diskStorage({
   
    filename:(req , file , cb)=>(
        cb(null , Date.now() + "-" +  file.originalname)
    )
})

const uplode = multer({storage})

export default uplode