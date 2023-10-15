const mongoose=require("mongoose")

const dateModelSchema=new mongoose.Schema({

    name:{
        type:String
    },
    date:{
        type: Date,
        default:Date.now()
    },
})

module.exports=mongoose.model("newdate",dateModelSchema)


