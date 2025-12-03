const express=require("express");
const {conrollerrep}=require("../controller/controlleruser")
const usersrout=express.Router();
usersrout.get("/repositories",conrollerrep);
module.exports=usersrout;