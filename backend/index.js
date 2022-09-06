import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import db from './config/Database.js'
// import Users from './models/userModel.js'
// import Category from './models/categoryModel.js
// import Product from './models/productModel.js
import userRouter from './routers/userRouter.js'
import catgoryRouter from './routers/categoryRouter.js'
import productRouter from './routers/productRouter.js'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload())
app.use(express.static("public")) //public images on http url



try {
    await db.authenticate()
    console.log('Database Connected')
    // await Users.sync()
    // await Category.sync()
    // await Product.sync()
} catch (error) {
    console.log(error)
}

app.use('/user',userRouter)
app.use('/api',catgoryRouter)
app.use('/api',productRouter)

app.listen(5000,()=>{
    console.log('Server is running at port','http://localhost:'+5000)
})