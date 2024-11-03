
const { response } = require("express");
const Users=require("../models/Users")
const bcrypt=require('bcryptjs');
const cookie=require("cookie-parser");
const jsonwebtoken=require('jsonwebtoken');
const multer=require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });




// Request OTP
exports.requestOtp = async (req, res) => {
    const { email } = req.body; 
   // const email="717821f116@kce.ac.in"
   if (!email) {
       return res.status(400).json({ error: "Email is required" });
   }
   const otp = generateOtp();
   await sendotp(email,otp);
   storeOtp(email, otp);
   res.json("Email Sent To User")
};


//To Verify User
exports.ChechUser=async(req,res)=>{
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.json({ status: "Unauthorized" });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.json({ status: "Token Missing" });
    }
    //   const decoded = jsonwebtoken.verify(token, "jwt-secret-key");
    //   if (decoded.role === "user") {
    //     return res.json({ status: "Success" });
    //   } else {
    //     return res.json({ status: "Not User" });
    //   }
  }

//To login
exports.login=async(req,res)=>{
    const {email,password}=req.body;
    Users.findOne({email:email})
    .then((result)=>{
        if(result){
            bcrypt.compare(password,result.password,(error,response)=>{
                if(response){
                    const usertoken=jsonwebtoken.sign({email:result.email,id:result.id},"jwt-secret-key",{expiresIn:'1d'});
                    // console.log(usertoken);
                    return res.json({status:"success",token:usertoken,id:result.id,email:result.email});
                }else{
                    return res.json("Not a Valid password");
                }
                // console.log(response);
            })
        }else{
            console.log("invalid");
        }
    }).catch((err)=>{
        res.json(err)
    })

}



//To add user
exports.addUser=async(req,res)=>{
    const {name,email,phone,password}=req.body;
     Users.findOne({email:email})
    .then((result)=>{
        if(result){
            return res.json("Email already exists");
        }
    })
    
    let hashedpassword;
try{
hashedpassword=await bcrypt.hash(password,12);
}catch(err){
     const error=new createHttpError('try again',500);
     return next(error);
}
Users.create({name,email,phone,password:hashedpassword})
    .then((user)=>res.json("Account created"))
    .catch((err)=>res.json(err))

}