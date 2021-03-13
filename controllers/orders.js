const Product = require('../models/Product.js')
const Order = require('../models/Order.js')
const asyncHandler = require('../middleware/async');
const User = require('../models/User.js');

// @desc     Create order - used only for buyer
// @route    Post /api/v1/orders/
// @access   Private/Admin
exports.createOrder=asyncHandler( async(req,res,next)=>{
  const user = await User.findById(req.user._id);

  if(user.role!=='buyer') {
    return res.status(401).json({
      success: false,
      data: 'You cannot place an order'
    });
  }

  const product = await Product.findById(req.body.product);
  console.log(product);

  const orderObj = {
    product: req.body.product,
    quantity: req.body.quantity,
    buyer: req.user._id,
    seller: product.seller,
    totalCost: (req.body.quantity * product.cost),
  }
  if(orderObj.quantity<=product.quantity){
    const order = await Order.create(orderObj);
    product.quantity -= orderObj.quantity;
    product.save()
    return res.status(200).json({
      success: true,
      data: order
    })
  }
  res.status(400).json({
    success: true,
    data: `only ${product.quantity} are available`
  });
});

// @desc     Get orders - used only for buyer
// @route    Get /api/v1/orders/current
// @access   Private/Admin
exports.getCurrentOrders = asyncHandler( async(req, res, next) => {
  const user=await User.findById(req.user._id);
  if(user.role==="buyer"){
    const orders=await Order.find({buyer:req.user._id,
      status:{$ne:'Delivered'}});
      return res.status(200).json({
        success:true,
        data:orders
      });
  } else if(user.role === 'seller') {
    const orders = await Orders.find({seller:req.user._id, status:{$ne:'Delivered'}});
      return res.status(200).json({
        success:true,
        data:orders
      });
  } else {
    const orders=await Order.find({middleman:req.user._id,
      status:'Delivered'});
      return res.status(200).json({
          success:true,
          data:orders
      });
  }
});

// @desc     Get Past Orders
// @route    GET /api/v1/orders/past
// @access   Private/Admin
exports.getPastOrders = asyncHandler( async(req, res, next) => {
  const user=await User.findById(req.user._id);
  if(user.role==="buyer"){
    const orders=await Order.find({buyer:req.user._id,
      status: 'Delivered'});
      return res.status(200).json({
        success:true,
        data:orders
      });
  } else if(user.role === 'seller') {
    const orders = await Orders.find({seller:req.user._id, status: 'Delivered'});
      return res.status(200).json({
        success:true,
        data:orders
      });
  } else {
    const orders=await Order.find({middleman:req.user._id,
      status:'Delivered'});
      return res.status(200).json({
          success:true,
          data:orders
      });
  }
});