const path=("path");
const fs=("fs");
const {arrusers}=require("./data");
const getrepositories=(username)=>{
const myuser=arrusers.find((item)=>item.username==username);
return myuser;
}
module.exports={getrepositories};