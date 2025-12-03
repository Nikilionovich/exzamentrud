const path = require("path");
const fs = require("fs");
const {sendmesspass}=require("../modules/workemail");
const PATH_USER=path.join(__dirname,"json","users.json");
let arrusers = {
  ...JSON.parse(fs.readFileSync(path.join(__dirname, "json", "users.json"), "utf-8"))
}

const finduser = (username) => {
  if (!arrusers.hasOwnProperty(username)) {
    throw new Error("Такого юзера нету");
  }
  return arrusers[username]; 
};
const finduserbyemail=(email)=>{
  for (const key in arrusers) {
    if (arrusers[key].email==email) return arrusers[key];  
  }
  throw new Error("Такого юзера нету");
}
const checkemail=(email)=>{
  for (const el in arrusers) {
    if(arrusers[el].email==email) return true;
  }
return false
}
const checkpassword=(myuser,username,password)=>{
   if (myuser.password==password)return true ;
   else return false;
}
const checksigin=(username,password)=>{
  let myuser;
if (username.includes("@"))  myuser=finduserbyemail(username);
  else  myuser=finduser(username);
if (checkpassword(myuser,username,password)) return true;
else return false;
}
  const adduser = (newUser) => {
    const { username, email,...OtherData } = newUser;
    if (arrusers.hasOwnProperty(username)) {
      return { errorMessage: "Пользователь существует" };
    }
    if (checkemail(email)) {
      return { errorMessage: "Такой email уже существует " };
    }
    if (!newUser || !username) {
      return { errorMessage: "Неправильно ввели данные" };
    }
    arrusers[username] = {
      email,
      ...OtherData,
      repositories: []
    }
    fs.writeFileSync(PATH_USER,JSON.stringify(arrusers,null,2));
  }
const alreadysendmail=(user)=>{
 const {username}=user;
 sendmesspass({to:username});

}
module.exports = { finduser, adduser,checkpassword,checksigin,alreadysendmail };