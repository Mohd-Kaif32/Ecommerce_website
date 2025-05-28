const express=require("express");
const {registeUser}=require("../controllers/userController.js");
const router=express.Router();

router.route("/register").post(registeUser);

module.exports=router;