const express = require("express");
const { controllsignin, regnewuser,forgotpasscontroll} = require("../controller/conrtolleriniciacia");
const authorization = express.Router();
authorization.use((req, res,next) => {
    if (req.method == "GET") {
        authorization.get("/sign-in", (req, res) => res.redirect(`/html/signin.html`));
        authorization.get("/reg-new-user", (req, res) => res.redirect(`/html/regform.html`));
        authorization.get("/forgotpass",(req,res)=>res.redirect(`/html/forgotpass.html`));
      
        authorization.get("/sign-in/veref", controllsignin);
    } 
    next();
}
)
authorization.use(express.json());
authorization.post("/reg-new-user/veref", regnewuser); 
 authorization.post("/forgotpass/veref",forgotpasscontroll)
module.exports = authorization;