const express=require("express");
const postDate = require("../controllers/postDate");
const getDate = require("../controllers/getDate");


const router=express.Router();

router.post("/postDates",postDate)
router.get("/getDate",getDate)


module.exports=router