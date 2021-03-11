const User = require('../models/User');

//@desc     Get all users
//@route    GET /api/v1/auth/users
//@access   Private/Admin
exports.getUsers = () => {
  res.status(200).json({
    sucess: true,
    data: user
  });
};