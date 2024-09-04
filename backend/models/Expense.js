const mongoose =require('mongoose')
const expenseSchema = new mongoose.Schema({
    date: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true }
});
// let Expense = mongoose.model("Expense", expenseSchema)
module.exports=mongoose.model("Expense",expenseSchema);