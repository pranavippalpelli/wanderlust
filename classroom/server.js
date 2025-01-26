const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");


app.engine('ejs', engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//------------------------------------------------------------------------------------------------------------------------------------------
//npm install express-session
//it creates diff middlewares with diff functions

//if we open website in same browser and two or more tabs . then session id created is same.
//for ex. in amazon if we add orders in cart in one tab and open website again in another tab in same browser,it will show same session and cokkies , orders etc.

 
//------------------------------------------------------------------------------------------------------------------------------------------
//count no.of request send:  
// -----------------------------------------------------------------------------------------------------------------------------------------

// app.get("/reqcount",(req,res)=>{
//     if(!req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }

//     res.send(`you send a request ${req.session.count} times`);
// })
//------------------------------------------------------------------------------------------------------------------------------------------


//used from npm express-session documentation
app.use(session({secret:"mysupersecretstring",resave:false,saveUninitialized:true}));



//------------------------------------------------------------------------------------------------------------------------------------------
//flash is special area of user used for storing messages.messages are written to flash and cleared after being displayed to user.
//npm install connect-flash.
//it is compulsary to use session while using flash
//req.flash("key","value");
//speical thing about flash is written in page.ejs
//------------------------------------------------------------------------------------------------------------------------------------------


app.use(flash());
app.get("/register",(req,res)=>{
    let {name = "unknown"} = req.query;
    req.session.name = name;
    req.flash("success","user registered successfully");
    req.flash("error","user not registered");
    res.redirect("/hello");
})


app.get("/hello",(req,res)=>{
    res.locals.messages = req.flash("error")
    res.render("page.ejs",{name: express.session.name ,msg:req.flash("success")});   //key is passed here to display msg on page
})



app.listen(3030, () => {
    console.log("Server is running on port 3000");
  });
  
 
