require("dotenv").config()

const express=require("express")
const routes=require("./routes/routess")

require("./config/dbConnect")

const app=express()
app.use(express.json())

PORT=process.env.PORT

app.use("/",routes)

app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`);
})