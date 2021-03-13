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
// @route    Get /api/v1/orders/placed
// @access   Private/Admin
exports.getPlacedOrders = asyncHandler( async(req, res, next) => {
  const user=await User.findById(req.user._id);
  if(user.role==="buyer"){
    const orders=await Order.find({buyer:req.user._id,
      status:'Placed'});
      return res.status(200).json({
        success:true,
        data:orders,
        count:orders.length
      });
  } else if(user.role === 'seller') {
    const orders = await Orders.find({seller:req.user._id, status:'Placed'});
      return res.status(200).json({
        success:true,
        data:orders,
        count: orders.length
      });
  } else {
    const orders=await Order.find({middleman:req.user._id,
      status:'Placed'});
      return res.status(200).json({
          success:true,
          data:orders,
          count:orders.length
      });
  }
});

// @desc     Get Dispatched Orders
// @route    GET /api/v1/orders/dispatched
// @access   Private/Admin
exports.getDispatchedOrders = asyncHandler( async(req, res, next) => {
  const user=await User.findById(req.user._id);
  if(user.role==="buyer"){
    const orders=await Order.find({buyer:req.user._id,
      status:'Dispatched'});
      return res.status(200).json({
        success:true,
        data:orders, 
        count:orders.length
      });
  } else if(user.role === 'seller') {
    const orders = await Orders.find({seller:req.user._id, status:'Dispatched'});
      return res.status(200).json({
        success:true,
        data:orders,
        count: orders.length
      });
  } else {
    const orders=await Order.find({middleman:req.user._id,
      status:'Dispatched'});
      return res.status(200).json({
          success:true,
          data:orders,
          count:orders.length
      });
  }
});
// @desc     Get Past Orders
// @route    GET /api/v1/orders/delivered
// @access   Private/Admin
exports.getDeliveredOrders = asyncHandler( async(req, res, next) => {
  const user=await User.findById(req.user._id);
  if(user.role==="buyer"){
    const orders=await Order.find({buyer:req.user._id,
      status: 'Delivered'});
      return res.status(200).json({
        success:true,
        data:orders,
        count:orders.length
      });
  } else if(user.role === 'seller') {
    const orders = await Orders.find({seller:req.user._id, status: 'Delivered'});
      return res.status(200).json({
        success:true,
        data:orders,
        count: orders.length
      });
  } else {
    const orders=await Order.find({middleman:req.user._id,
      status:'Delivered'});
      return res.status(200).json({
          success:true,
          data:orders,
          count: orders.length
      });
  }
});
// @desc     Get Past Orders
// @route    DELETE /api/v1/orders/delete/:id
// @access   Private/Admin
exports.deleteOrder= asyncHandler( async(req, res, next) => {
  const user=await User.findById(req.user._id);
  if(user.role==='buyer'){
    const order=await Order.findById(req.params.id);
    if(String(req.user._id)===String(order.buyer)){
      if(order.status==="Placed"){
        const product=await Product.findById(order.product);
        product.quantity=product.quantity+order.quantity;
        await Order.deleteOne(order)
        return res.status(200).json({
          success:true,
          data:"Order deleted Succesfully"
        })
      }else{
        return res.status(400).json({
          success:false,
          data:"Order has already been dispatched"
        })
      }}else{
        return res.status(400).json({
          success:false,
          data:"You are denied of access to delete this order"
        })

      }}else{
        return res.status(400).json({
          success:false,
          data:"Unauthorized to delete orders"
        })
      }
});

