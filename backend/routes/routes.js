const express=require('express')
const router=express.Router()
const controller=require('../Controllers/ExpenseController')
const regcontrol=require('../Controllers/RegController')


// TO request OTP
router.post("/getotp",regcontrol.requestOtp)

//to get
router.get("/ad",controller.getDetails)

//to post
router.post("/add",controller.postExpenses)

//to put
router.put("/:id",controller.editExpenses);

//to delete
router.delete('/:id',controller.deleteExpenses);

// To add users
router.post("/user",regcontrol.addUser)

//To login
router.post("/login",regcontrol.login)

//Verify User
router.get("/home",regcontrol.ChechUser)







module.exports=router;