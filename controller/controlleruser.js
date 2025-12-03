const {finduser}=require("../data/data");
const conrollerrep=(req,res)=>{
    const {username}=req.query;
    const myuser=finduser(username);
    res.json(myuser.repositories);
}
module.exports={conrollerrep}