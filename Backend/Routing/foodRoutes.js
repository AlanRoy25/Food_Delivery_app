
import express from 'express'
import { addFood , listfood, removeFood} from '../controllers/foodcontroller.js'
import multer from 'multer'

const foodRouter = express.Router();


//image storage enginer

const storage = multer.diskStorage({
  destination: "uploads",
  filename:(req,file,cb)=> {
    return cb(null, `${Date.now()}${file.originalname}` )
  }
})

const upload = multer({storage})

foodRouter.post('/add', upload.single('image'), addFood)
foodRouter.get('/list', listfood)
foodRouter.post('/remove', removeFood)




export default foodRouter