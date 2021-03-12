const express=require('express');
const router=express.Router();

const {
  getUsers,
  getUser
} = require('../controllers/users');

// all routes should be api/user/" xyz "

//Get Users
router.get("/",getUsers);

//Get particular user with id
// router.get("/:id",getUser);

// //Update particular user with id
// router.patch("/:id",updateUser);

// //Delete user with given id
// router.delete("/:id", deleteUser);

module.exports=router;