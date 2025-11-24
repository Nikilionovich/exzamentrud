const fs = require("fs");
const path = require("path");
const templateAbout=fs.readFileSync(path.join(__dirname,"../","templates","about.html"),"utf-8");
  const templateProject=fs.readFileSync(path.join(__dirname,"../","templates","project.html"),"utf-8");
  const templateSkills=fs.readFileSync(path.join(__dirname,"../","templates","skills.html"),"utf-8");
  module.exports={templateAbout,templateProject,templateSkills};