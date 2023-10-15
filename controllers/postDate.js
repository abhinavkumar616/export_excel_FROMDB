const dateModel=require("../models/dateModel")
const moment = require('moment-timezone');

const postDate=async(req,res)=>{
    console.log("hellllllllll");
    try{
        const {name}=req.body

        // const indianDateTime = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
        // console.log('Current Indian Date and Time:', indianDateTime);
        // let date=indianDateTime

        const data=await dateModel.create({
            name
        })
    // console.log("newData",data);
    await data.save();
    res.status(201).json({ message: 'Data created successfully', data: data });
    }
    catch(error){
        res.status(500).send({
            status:"Fail",
            error:error.message
        })
    }
}
module.exports=postDate


// const dateModel=require("../models/dateModel")
// const moment = require('moment-timezone');

// const postDate=async(req,res)=>{
//     console.log("hellllllllll");
//     try{
//         const {name}=req.body

//         const indianDateTime = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
//         console.log('Current Indian Date and Time:', indianDateTime);
//         let date=indianDateTime

//         const data=await dateModel.create({
//             name,date
//         })
//     console.log("newData",data);
//     await data.save();
//     res.status(201).json({ message: 'Data created successfully', data: data });
//     }
//     catch(error){
//         res.status(500).send({
//             status:"Fail",
//             error:error.message
//         })
//     }
// }
// module.exports=postDate



