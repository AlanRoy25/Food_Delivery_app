
import express from 'express'
import { addFood , listfood, removeFood} from '../controllers/foodcontroller.js'
import multer from 'multer'

const FoodRouter = express.Router();


//image storage enginer

const storage = multer.diskStorage({
  destination: "uploads",
  filename:(req,file,cb)=> {
    return cb(null, `${Date.now()}${file.originalname}` )
  }
})

const upload = multer({storage:storage})

FoodRouter.post('/add', upload.single('image'), addFood)
FoodRouter.get('/list', listfood)
FoodRouter.post('/remove', removeFood)




export default FoodRouter