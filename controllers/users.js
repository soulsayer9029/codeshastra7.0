const User = require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const asyncHandler = require('../middleware/async');

//@desc     Get all users
//@route    GET /api/v1/users
//@access   Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    sucess: true,
    data: users
  });
});

// @desc     Get single users
// @route    GET /api/v1/users/:id
// @access   public
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findbyId(req.params.id);

  if(!user) {
    return res.status(404).json({
      sucess: false,
      data: "User does not exist"
    });
  }

  res.status(200).json({
    sucess: true,
    data: user
  });
});

//@desc     Create a new users
//@route    POST /api/v1/users
//@access   Public
exports.createUser = asyncHandler(async (req, res, next) => {
  //hashing the password 
  const salt=await bcrypt.genSalt(10)
  const hashedPassword=await bcrypt.hash(req.body.password,salt)
  
  const user=new User({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    aadharNumber:req.body.aadharNumber,
    state:req.body.state,
    pinCode:req.body.pinCode,
    mobileNumber:req.body.mobileNumber,
    role:req.body.role,
    password:hashedPassword,
  });
//saving 
  await user.save()
  res.status(200).json({
    sucess: true,
    data: user
  });
});

// @desc     Login
// @route    POST /api/v1/users/login
// @access   Public
exports.login=async(req,res)=>{
    const user=await User.findOne({email:req.body.email})
      if(!user){
          return res.status(400).send("Invalid credentials + User not found");
      }
      // console.log(user)
      const validPassword = await bcrypt.compare(req.body.password ,user.password)
      
      if(!validPassword){
          return res.status(400).send("Invalid Credentials")
      }
      try{
        const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
        res.status(200).header('auth-token',token).json({
          sucess: true,
          data: user,
          token: token
        });
      }catch(e){
        return res.status(400).send("Login failed")
      }
}

// @desc     Update existing user
// @route    PATCH /api/v1/users/:id
// @access   Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc     Delete an existing user
// @route    Delete /api/v1/users/:id
// @access   Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if(!user) {
    res.status(400).send('User does not exist');
  }

  user.remove();
  res.status(200).json({
    success: true,
    data: 'user deleted'
  });
});