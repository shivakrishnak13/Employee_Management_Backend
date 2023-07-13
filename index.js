const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connection } = require("./db");
const { userRouter } = require("./Routes/user.routes");
const { authmiddleware } = require("./Middlewares/auth.middleware");
const { employeeRouter } = require("./Routes/employe.routes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user",userRouter);
app.use("/employees",authmiddleware,employeeRouter)

app.listen(process.env.PORT,async ()=>{
    try {
        await connection;
        console.log("server is connected to db")
        console.log("server is running")

    } catch (error) {
        console.log("error",error.message)
    }
});

