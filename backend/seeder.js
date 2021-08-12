import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import ConnectDB from './config/db.js'

dotenv.config();

ConnectDB()

const importData  = async () =>{
  try {
    ConnectDB()
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers =await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map(product => {
      return {...product , user:adminUser}
    })

    await Product.insertMany(sampleProducts)
    
    console.log('Data imported')
    process.exit()


  } catch (e) {
    console.error(e.message);
    process.exit(1)

  }
}


const destroyData = async() => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()


    console.log('Data Destroyed')
    process.exit()


  } catch (e) {
    console.error(e.message);
    process.exit(1)

  }


}
if(process.argv[2] === "-d")
{
  destroyData()
}
else {
  importData()
}