const User = require('../models/User');
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

//@desc     Get single users
//@route    GET /api/v1/users/:id
//@access   Private/Admin
// exports.getUsers = asyncHandler(async (req, res, next) => {
//   const user = await User.findbyId(req.params.id);

//   if(!user) {

//   }

//   res.status(200).json({
//     sucess: true,
//     data: user
//   });
// });

//@desc     Get all users
//@route    POST /api/v1/users
//@access   Public
exports.createUser = async (req, res, next) => {
  const users = await User.find();
  console.log(users);
  res.status(200).json({
    sucess: true,
    data: users
  });
};