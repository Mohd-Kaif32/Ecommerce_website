const ErrorHandler=require("../utils/errorhandler.js");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const User=require("../models/userModel");
const sendToken=require("../utils/jwtToken.js");
const sendEmail=require("../utils/sendEmail");
const bcrypt=require("bcryptjs");
const crypto=require("crypto");

// const comparePassword=require("../models/userModel");
//Register a User
exports.registeUser=catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password}=req.body;
    const user=await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"this is a sample id",
            url:"profilepicUrl",
        }
    })



    sendToken(user,201,res);
    // const token=user.getJWTToken();
    // console.log(token);
    
    // res.status(201).json({
    //     success:true,
    //     token
    // })
})

exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;

    if(!email||!password){
        return next(new ErrorHandler("please Enter Email & password",400))
    }
    const user= await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))
    }
    const isPasswordMatched=await user.comparePassword(password);
    console.log(isPasswordMatched);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password down",401))
    }
    sendToken(user,200,res);
    // const token=user.getJWTToken();
    // res.status(200).json({
    //     success:true,
    //     token
    // })
})

exports.logout=catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
})

exports.forgotPassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found",404));
    }
// console.log("kaiffff");
    const resetToken=user.getResetPasswordToken();
    // console.log(resetToken);
// console.log("till")
    await user.save({validateBeforeSave:false});
console.log(req.protocol);
    const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message=`Your password reset token is :-\n\n ${resetPasswordUrl} \n\nIf you have not requested this email then please ignore it`;

    try {
        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Recovery`,
            message,
        })


        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`,
        })
        
    } catch (error) {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save({validateBeforeSave:false});
        console.log("thissss");
        return next(new ErrorHandler(error.message,500));
    }
})

exports.resetPassword=catchAsyncErrors(async(req,res,next)=>{
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    })

    if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired",400))
    }
    // console.log(req.body.password);
    // console.log(req.body.confirmPassword);
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400));
    }

    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();

    sendToken(user,200,res);
})

exports.getUserDetails=catchAsyncErrors(async(req,res,next)=>{
        const user=await User.findOne({_id:req.user.id});

        res.status(200).json({
            success:true,
            user,
            name:"kaif"
        })
})

exports.updatePassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password is incorrect",400));
    }

    if(req.body.newPassword!==req.body.confirmPassword){
        return next(new ErrorHandler("password does not match",400));
    }

    user.password=req.body.newPassword;


    await user.save();
    
    sendToken(user,200,res);


})

exports.updateProfile=catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
    };

    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true
    })
})

// Get all user(admin)
exports.getAllUser=catchAsyncErrors(async(req,res,next)=>{
    const users=await User.find();

    res.status(200).json({
        success:true,
        users,
    })
})

//Get single user
exports.getSingleUser=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with Id:${req.params.id}`))
    }
    res.status(200).json({
        success:true,
        user,
    })
})

//update User Role --Admin

exports.updateUserRole=catchAsyncErrors(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    };
    
    // we will add coudinary late
console.log("kkkkkk");
    const user=await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
console.log("kkk");
    res.status(200).json({
        success:true,
    })

})

// Delete User --Admin

exports.deleteUser=catchAsyncErrors(async(req,res,next)=>{
    const user=await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`));
    }

    await user.deleteOne({_id:req.params.id});

    res.status(200).json({
        success:true,
        message:"user deleted successfully"
    })

})
