import  express from 'express';
// import products from './data/products.js'
import dotenv from 'dotenv'
import ConnectDB from './config/db.js'
import  productRoutes from './routes/productRoutes.js'
import  userRoutes from './routes/userRoutes.js'
import  orderRoutes from './routes/orderRoutes.js'

import {notfound , errorHandler} from './middleware/errorMiddleware.js'
dotenv.config()

ConnectDB()
const app = express()

app.use(express.json())

app.get("/" , (req , res) =>{
  res.send("Api is running....")
})

app.use('/api/products' , productRoutes)
app.use('/api/users' , userRoutes)
app.use('/api/orders' , userRoutes)



app.use(errorHandler)

app.use(notfound)




const PORT = process.env.PORT || 5000

app.listen(PORT , () =>{
  console.log(`Server is listening in  ${process.env.NODE_ENV} on ${PORT}` );
})
