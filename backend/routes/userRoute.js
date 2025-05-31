const express=require("express");
const {registeUser,loginUser,logout,forgotPassword}=require("../controllers/userController.js");
const router=express.Router();

router.route("/register").post(registeUser);



router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/logout").get(logout);

module.exports=router;