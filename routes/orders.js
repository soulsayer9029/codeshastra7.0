const express=require('express');
const router=express.Router();
const { verifyToken}=require('../middleware/verifytoken.js')
const {
    createOrder,
    getCurrentOrders,
    getPastOrders
} = require('../controllers/orders.js');

//Create order
router.post('/', verifyToken, createOrder);

//Get cuurent orders
router.get('/current', verifyToken, getCurrentOrders);

//Get past orders
router.get('/past', verifyToken, getPastOrders);


module.exports=router;