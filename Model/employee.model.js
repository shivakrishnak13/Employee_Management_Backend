const mongoose = require("mongoose");

const employeeShema = mongoose.Schema({
    firstname : String,
    lastname : String,
    email:String,
    department: String,
    salary : Number,
    userID: String
},{
    versionKey:false
});

const employeeModel = mongoose.model("employee",employeeShema);

module.exports = {employeeModel}


