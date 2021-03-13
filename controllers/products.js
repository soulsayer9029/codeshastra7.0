const Product=require('../models/Product.js')
const asyncHandler = require('../middleware/async');
const User = require('../models/User.js');

// @desc     Create a new product
// @route    POST /api/v1/products/
// @access   Private/Admin
exports.createProduct = asyncHandler(async (req, res, next) => {
  const user = await User.findById({_id:req.user._id});
  if(user.role!=="seller"){
    return res.status(401).json({
        success:false,
        data:"Access denied"
    })
}
  const productObj = {
    quantity: req.body.quantity,
    cost: req.body.cost,
    seller: req.user._id
  }
  const product = await Product.create(productObj);

  res.status(201).json({
    success: true,
    data: product
  });
});

// @desc     Get all products
// @route    GET /api/v1/products/
// @access   Private/Admin
exports.getProducts=asyncHandler(async(req,res,next)=>{
    const user = await User.findById({_id:req.user._id});
    if(user.role!=="buyer"){
        return res.status(401).json({
            success:false,
            data:"Access denied"
        })
    }
    
    const id=req.user.id;
    const products= await Product.find().populate('seller', 'firstName lastName email');
    res.status(200).json({
      success: true,
      data: products,
      count: products.length
    })
});

// @desc     Get my products - used only for seller
// @route    GET /api/v1/products/
// @access   Private/Admin
exports.getMyProducts=asyncHandler(async(req,res,next)=>{
    
    const user = await User.findById({_id:req.user._id});
    
    if(user.role!='seller'){
        return res.status(401).json({
            success:false,
            data:"Access denied"
        })
    }
    
    const products= await Product.find({seller:user._id}).populate('seller', 'firstName lastName email');
    res.status(200).json({
      success: true,
      data: products,
      count: products.length
    })
});

// @desc     Update product - used only for seller
// @route    PATCH /api/v1/products/:id
// @access   Private/Admin
exports.updateProduct=asyncHandler( async(req,res,next)=>{

  const user = await User.findById(req.user._id);
  if(user.role!='seller'){
    return res.status(401).json({
        success:false,
        data:"Access denied, user not a seller"
    })
  }

  let product = await Product.findById(req.params.id);

  if(String(user._id)!==String(product.seller)){
    return res.status(401).json({
      success: false,
      data: 'Access denied, product does not belong to you'
    });
  }
  
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    data: product
  })
});


// @desc     Delete product - used only for seller
// @route    GET /api/v1/products/
// @access   Private/Admin
exports.deleteProduct=asyncHandler(async(req,res,next)=>{
  
    const user = await User.findById(req.user._id);
    
    if(user.role!='seller'){
        return res.status(401).json({
            success:false,
            data:"Access denied"
        })
    }
    const id=req.params.id
    
    const product= await Product.findById(id)
    if(String(product.seller) === String(user._id)){
        await Product.deleteOne({_id:id})
        res.status(200).json({
            success: true,
            data: "product deleted successfully",
            
        })
    }else{
        res.status(401).json({
            success: false,
            data: "access denied ,unable to delete",
            
        })
    }
});