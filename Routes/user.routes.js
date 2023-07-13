const express = require("express");
require('dotenv').config(); // Load environment variables from .env file.
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../Model/user.model");


const userRouter = express.Router();


userRouter.post("/signup",async (req,res)=>{
    const {name,email,password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if(user){
            res.status(200).json({msg:"user already exists"})
        }else{
            bcrypt.hash(password,3,async(error,hash)=>{
                if(hash){
                    const newUser = new userModel({name,email,password:hash});
                    await newUser.save();
                    res.status(200).json({msg:"user registerd succesfull",newUser})
                }else{
                    res.send(200).json({error})
                }
            })
        }   
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});


userRouter.post("/login", async (req,res)=>{
    const {email,password}= req.body;
    try {
        const user = await userModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password,async (err,result)=>{
                if(result){
                    var token = jwt.sign({userID: user._id},process.env.SECRET_KEY);
                    res.status(200).json({msg:"user successfully logged in",token,user: user._id})
                }else{
                    res.status(501).json("Invalid Password")
                }
            })
        }else{
            res.status(409).json({"Error": "Email not found!" });
        } 
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = {userRouter}