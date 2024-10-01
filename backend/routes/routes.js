const express=require('express')
const router=express.Router()
const controller=require('../Controllers/ExpenseController')

//to get
router.get("/ad",controller.getDetails)

//to post
router.post("/add",controller.postExpenses)

//to put
router.put("/:id",controller.editExpenses);

//to delete
router.delete('/:id',controller.deleteExpenses);







module.exports=router;