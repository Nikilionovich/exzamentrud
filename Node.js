//npm i dotenv
const express=require("express");
const authorization=require("./router/authorization");
const usersrout=require("./router/users");
const path=require("path")
const app= express();
app.get("/",(req,res)=>res.redirect("/main.html"))
app.use("/users/",usersrout);
app.use("/authorization/",authorization)
app.use(express.static(path.join(__dirname,"public")));
app.listen(3000,()=>console.log("запущен на порте 3000"))