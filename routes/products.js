const express=require('express');
const router=express.Router();
const {verifyToken}=require('../middleware/verifytoken.js')
const {
  createProduct,
  getProducts,
  getMyProducts,
  updateProduct,
  deleteProduct
} = require('../controllers/products');

//Create a product
router.post('/create', verifyToken, createProduct);

//Get all products
router.get('/',verifyToken,getProducts);

//Get my products
router.get('/myproducts', verifyToken, getMyProducts);

//Update a product
router.patch('/:id', verifyToken, updateProduct);

//Delete a product
router.delete('/:id', verifyToken, deleteProduct);

module.exports=router;