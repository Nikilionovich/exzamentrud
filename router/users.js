const express=require("express");
const {conrollerrep}=require("../controller/conrolleruser")
const usersrout=express.Router();
usersrout.get("/repositories",conrollerrep);
module.exports=usersrout;