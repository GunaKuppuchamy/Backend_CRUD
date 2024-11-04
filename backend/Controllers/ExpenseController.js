const Expensers = require("../models/Expense");


//To get
exports.getDetails = async (req, res) => {
    const expense = await Expensers.find()
    res.json(expense);
}



//To add
exports.postExpenses = async (req, res) => {
    const { date, category, amount } = req.body;
    const dates=new Date().toLocaleDateString;
    const newItem = new Expensers({ date: dates, category, amount });
    newItem.save();
    res.status(200).json(newItem);
}

//To edit
exports.editExpenses = async (req, res) => {
    const id = req.params.id;
    // console.log(req.body);
    Expensers.findByIdAndUpdate(id, req.body).then(() => console.log("")).catch((err) => console.log(err));
    const expense = await Expensers.find();
    res.json(expense);
    
    // const id = req.params.id;
    // Expensers.findByIdAndUpdate(id, req.body)
    //     .then(() => res.json("Updated successfully"))
    //     .catch((er) => res.json(er));
    //     return res.json(Expensers.find());
}

//To delete
exports.deleteExpenses = async (req, res) => {
    const id = req.params.id;
    Expensers.findByIdAndDelete(id).then(() => console.log("")).catch((err) => console.log(err));
    // Expense.find({}).then((data) => res.json(data)).catch((err) => console.log(err));
    
    return res.json("success");
    // const id = req.params.id;
    // Expensers.findByIdAndDelete(id)
    //     .then(() => res.json("Deleted successfully"))
    //     .catch((er) => res.json(er));
}