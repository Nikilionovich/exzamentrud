const path=require("path");
const fs=require("fs");
const formidable=require("formidable");
const UPLOAD_DIR=path.join(__dirname,"../public","uploads");
const {sortmyuserfileds}=require("../utils/utility");
const {getrepositories,adduser,checksigin}=require("../data/data");
const regnewuser=(req,res)=>{
    let form=new formidable.IncomingForm({
  uploadDir:UPLOAD_DIR
    })
    form.on("fileBegin",(name,file)=>{ 
      file.filepath=path.join(file.uploadDir,file.originalFilename);
    })
    form.parse(req,(err,userfields,file)=>{
       if (err||!userfields||!file) {
           return res.status(400).json({err:"неправильно ввели"});
       } 
       userfields=sortmyuserfileds(userfields);
       const us=adduser({...userfields});
       if(us) res.json(us.errorMessage);
       else  res.json({message:"создался"});
    })
  }
const conrollerrep=(req,res)=>{
    const {username}=req.query;
    const myuser=getrepositories(username);
    res.json(myuser.repositories);
}
const controllsignin=(req,res)=>{
  const{username,password}=req.query;
    if (checksigin(username,password)) {
      res.json({message:"Все збс"});
    } else {
       res.status(400).json({err:"неправильно ввели"});
    }
}
module.exports={controllsignin,conrollerrep,regnewuser}