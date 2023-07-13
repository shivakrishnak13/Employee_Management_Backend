const mongoose = require("mongoose");

const userShema = mongoose.Schema({
    email: String,
    password : String
},{
    versionKey:false
});

const userModel = mongoose.model("user",userShema);

module.exports = {userModel}


