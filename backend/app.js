const express=require("express");
const app=express();

const errorMiddleware=require("./middleware/error.js");


app.use(express.json());

const product=require("./routes/productRoute");
const user=require("./routes/userRoute.js");

app.use("/api/v1",product);
app.use("/api/v1",user);

app.use(errorMiddleware)



module.exports=app

