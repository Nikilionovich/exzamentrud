const path=require("path");
const fs=require("fs");
const formidable=require("formidable");
const UPLOAD_DIR=path.join(__dirname,"../public","uploads");
const {sortmyuserfileds}=require("../utils/utility");
const {adduser,checksigin,alreadysendmail}=require("../data/data");
const {sendmesspass}=require("../modules/workemail");
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
const controllsignin=(req,res)=>{
  const{username,password}=req.query;
    if (checksigin(username,password)) {
      res.json({message:"Все збс"});
    } else {
       res.status(400).json({err:"неправильно ввели"});
    }
}
const forgotpasscontroll=(req,res)=>{
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
    alreadysendmail({...userfields})

  })
}
module.exports={controllsignin,regnewuser,forgotpasscontroll}