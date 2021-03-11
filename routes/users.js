const express=require('express');

const router=express.Router()

// all routes should be api/user/" xyz "

//Get Users
router.get("/",getUsers);
//Sign Up/Crate user
router.post("/signup",createUser);
//Login
router.post("/login",login)
//Get particular user with id
router.get("/:id",getUser);
//Update particular user with id
router.patch("/:id",updateUser);
//Delete user with given id
router.delete("/:id", deleteUser);
//logout user
router.post("/logout", logout);
module.exports=router;