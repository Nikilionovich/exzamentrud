const {send} = require("./emailsender");
const path = require("path");
const fs = require("fs");
const sendmesspass=({to})=>{
    send({
        to,
        subject: "Тема письма",
        text: `Текст письма обычным текстом`
      });
}

module.exports={sendmesspass}