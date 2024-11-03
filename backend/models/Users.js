const mongoose =require('mongoose')
const UserSchema = new mongoose.Schema({
   name:String,
   email:String,
   phone:Number,
   password:String,
   image:{
      data: Buffer,
    contentType: String,
   }

});
// let Expense = mongoose.model("Expense", expenseSchema)
module.exports=mongoose.model("Users",UserSchema);