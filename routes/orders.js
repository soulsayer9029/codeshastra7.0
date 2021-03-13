const express=require('express');
const router=express.Router();
const { verifyToken}=require('../middleware/verifytoken.js')
const {
    createOrder,
    // getOrders
  
} = require('../controllers/orders.js');

//Create order
router.post('/', verifyToken, createOrder);

//Get order
// router.get('/', verifyToken, getOrders);


module.exports=router;