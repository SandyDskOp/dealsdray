const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config()

const userRoute = require("./router/userRouter")

app.use(cors())
app.use(express.json())
app.use("/user",userRoute)

//Vh663HodkIvZrd9K
mongoose.connect(
  process.env.MONGO_SERVER
).then(()=>{
    app.listen(5555)
    console.log("Db connected")
})
 