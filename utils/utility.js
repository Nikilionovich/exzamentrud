const sortmyuserfileds=(userfiels)=>{
    let res={};
    for (const key in userfiels) {
        if (userfiels.hasOwnProperty(key)&& userfiels[key].length > 0) {
            res[key]=userfiels[key][0];
        }
    }
    return res;
}

module.exports={sortmyuserfileds}