const express=require('express');
const router=express.Router();
const { verifyToken}=require('../middleware/verifytoken.js')
const {
    createOrder,
    getPlacedOrders,
    getDispatchedOrders,
    getDeliveredOrders,
    deleteOrder,
    acceptOrder,
    deliverOrder
} = require('../controllers/orders.js');

//Create order
router.post('/create', verifyToken, createOrder);

//Get cuurent orders
router.get('/placed', verifyToken, getPlacedOrders);

//Get cuurent orders
router.get('/dispatched', verifyToken, getDispatchedOrders);

//Get past orders
router.get('/delivered', verifyToken, getDeliveredOrders);

router.delete('/:id',verifyToken,deleteOrder);

router.patch('/accept/:id', verifyToken, acceptOrder);

router.patch('/deliver/:id', verifyToken, deliverOrder);

module.exports=router;