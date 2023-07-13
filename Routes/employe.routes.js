const {Router} = require("express");
const { employeeModel } = require("../Model/employee.model");
const { model } = require("mongoose");


const employeeRouter = Router();


employeeRouter.post("/add", async (req,res)=>{
    const {firstname,lastname,email,department,salary} = req.body;
    const userID = req.payload;
    try {

        const newEmployee = new employeeModel({...req.body,userID})
        await newEmployee.save();

        res.status(200).json({msg:"employee details saved",newEmployee})
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});


employeeRouter.get("/get",async (req,res)=>{
    const {pageno,limit,department,order,name} = req.query;
    const skip = (pageno-1)*limit;
    const userID = req.payload;
    let o;
    if(order=="asc"){
        o=1;
    }else{
        o=-1;
    }
    try {
        let employees;
        if(order && pageno && limit && department && name){
            const employees= await employeeModel.find({userID,department,firstname:name}).sort({salary:o}).skip(skip).limit(limit);
        }else

        if(order){
             employees = await employeeModel.find({userID}).sort({salary:o}).skip(skip).limit(limit);
        }else

        if(pageno && limit){
             employees= await employeeModel.find({userID}).skip(skip).limit(limit);
        }else

        if(department){
             employees = await employeeModel.find({userID,department}).skip(skip).limit(limit);
        }

        else if(name){
            const employees= await employeeModel.find({userID,firstname:name}).skip(skip).limit(limit)
        }
        else if(order && department){
            const employees= await employeeModel.find({userID,department}).sort({salary:o}).skip(skip).limit(limit)
        }
        else if(name && order){
            const employees= await employeeModel.find({userID,firstname:name}).sort({salary:o}).skip(skip).limit(limit);
        }
        
        else{
            employees =  await employeeModel.find({userID})
        }
        
        res.status(200).json({employees})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

employeeRouter.patch("/edit/:id",async (req,res)=>{
    const {id} = req.params;
    const userID = req.payload;
  try {
     const user = await employeeModel.findByIdAndUpdate({userID,_id:id},req.body);
     res.status(200).json({msg:"employees details updated"})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
});
employeeRouter.delete("/delete/:id",async (req,res)=>{
    const {id} = req.params;
    const userID = req.payload;
  try {
     const user = await employeeModel.findByIdAndDelete({userID,_id:id});
     res.status(200).json({msg:"employees details deleted"})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

module.exports = {employeeRouter}
