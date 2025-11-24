const path = require("path");
const fs = require("fs");
const PATH_USER=path.join(__dirname,"json","users.json");
let arrusers = {
  ...JSON.parse(fs.readFileSync(path.join(__dirname, "json", "auto.json"), "utf-8"))
}

const getrepositories = (username) => {
  const myuser = arrusers.find((item) => item.username == username);
  if (!myuser) {
    throw new Error("Такого юзера нету");
  }
  return myuser;
}
const adduser = (newUser) => {
  const { username, ...OtherData } = newUser;
  if (arrusers.hasOwnProperty(`${username}`)) {
    return { errorMessage: "Пользователь существует" };
  }
  if (!newUser || !username) {
    return { errorMessage: "Неправильно ввели данные" };
  }
  arrusers[username] = {
    ...OtherData
  }
  fs.writeFileSync(PATH_USER,JSON.stringify(arrusers,null,2))
  return  arrusers[username];
}
module.exports = { getrepositories, adduser };