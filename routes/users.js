const express=require('express');
const router=express.Router();
const { verifyToken}=require('../middleware/verifytoken.js')
const {
  getUsers,
  getUser,
  createUser,
  login,
  updateUser
} = require('../controllers/users');

// all routes should be api/user/" xyz "

//Get Users
router.get("/",getUsers);

//Get particular user with id
router.get("/:id",getUser);

//Signup
router.post("/signup",createUser)

//Login 
router.post("/login",login)

// //Update particular user with id
router.patch("/:id",verifyToken,updateUser);

// //Delete user with given id
// router.delete("/:id", deleteUser);

module.exports=router;