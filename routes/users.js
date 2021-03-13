const express=require('express');
const router=express.Router();

const {
  getUsers,
  getUser,
  createUser,
  login
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
// router.patch("/:id",updateUser);

// //Delete user with given id
// router.delete("/:id", deleteUser);

module.exports=router;