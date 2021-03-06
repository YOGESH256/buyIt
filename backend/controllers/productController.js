

import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'



//@desc Fetch All products
//@route GET /api/products
//@access  Public
const getProducts = asyncHandler(async(req, res) => {
  const products = await Product.find({});
  res.json(products)
})



//@desc Fetch A SIngle products
//@route GET /api/products/:id
//@access  Public
const getProductById = asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id);

  if(product)
  {
  res.json(product)
}
else {
  res.status(404);
  throw new Error('Product not found')
}

})




//@desc delete a product
//@route DELETE /api/products/:id
//@access  Private/Admin
const deleteProduct  = asyncHandler(async(req, res) => {
  const product = await Product.findById(req.params.id);
  console.log(product);

  if(product)
  {
    await product.remove()
  res.json({message : 'Product Removed'})
}
else {
  res.status(404);
  throw new Error('Product not found')
}

})




//@desc Create a product
//@route POST /api/products/
//@access  Private/Admin
const createProduct  = asyncHandler(async(req, res) => {
  const product = new Product({
    name: "Sample name",
    price :0,
    user:req.user._id,
    image :'/images/sample.jpg',
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock :0,
    numReviews:0,
    description:'Sample Description',
  })

  const createdProduct = await product.save()
  res.status(201)
  res.json(createdProduct)
})




//@desc Update a product
//@route PUT /api/products/:id
//@access  Private/Admin
const updateProduct  = asyncHandler(async(req, res) => {
const {name , price ,description , image ,brand , category, countInStock } = req.body

const product = await Product.findById(req.params.id)

if(product)
{
  product.name = name,
  product.description = description,
  product.price = price,
  product.category = category,
  product.image = image,
  product.brand = brand,
  product.countInStock = countInStock

}
else {
  res.status(404)
  throw new Error('Product not found')
}

  const updatedProduct = await product.save()
  res.status(201)
  res.json(updatedProduct);
})

export {getProducts , getProductById , deleteProduct , updateProduct , createProduct}
