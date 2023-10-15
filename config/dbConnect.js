const mongoose=require("mongoose")

async function getData(){
    try{
        await mongoose.connect(process.env.DB_KEY, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("mongodb is connected successfully....");
    }

    catch(error){
        console.log("something went wrong while connect with database");
    }
}

getData()