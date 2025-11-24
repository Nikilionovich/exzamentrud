//npm i dotenv
const express=require("express");
const regsignrout=require("./router/authorization");
const usersrout=require("./router/users");
const app= express();
app.use("/users/",usersrout);
app.use("/authorization/",regsignrout)