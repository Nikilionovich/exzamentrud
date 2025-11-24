const path=require("path");
const fs=require("fs");
const formidable=require("formidable");
const UPLOAD_DIR=path.join(__dirname,"../public","uploads");
const {sortmyuserfileds}=require("../utils/utility");
const {getrepositories,adduser}=require("../data/data");
const regnewuser=(req,res)=>{
    let form=new formidable.IncomingForm({
  uploadDir:UPLOAD_DIR
    })
    form.on("fileBegin",(name,file)=>{
      file.filepath=path.join(file.uploadDir,file.originalFilename);
    })
    form.parse(req,(err,userfields,file)=>{
       if (!err||!userfields||!file) {
           res.status(400).json({err:"неправильно ввели"});
       } 
       userfields=sortmyuserfileds(userfields);
       adduser({...userfields});
       res.json({message:"создался"});
    })
  }
const conrollerrep=(req,res)=>{
    const {username}=req.query;
    const myuser=getrepositories(username);
    
}