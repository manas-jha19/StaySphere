const express = require("express");
const app = express();
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");
const expressSession = require("express-session");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));



app.use(flash());

app.use(session({
    secret:"mysupersecret",
    resave:false,
    saveUninitialized:true
}));


// use middleware for flash msg showing
app.use((req,res,next)=>{
     res.locals.successMsg = req.flash("success");
     res.locals.errorMsg = req.flash("error");
     next();
});

app.get("/register",(req,res)=>{
     let {name = "annonymous"} = req.query;
     req.session.name = name;
     if(name === "annonymous"){
        req.flash("error","User not registered !");
     }else{
        req.flash("success","User register successfully!");
     }
    
     res.redirect("/hello");
});

app.get("/hello",(req,res)=>{

    res.render("page.ejs",{name: req.session.name});
})

app.listen(3000,()=>{
    console.log("Port Listening",3000);
});

// const cookiesParser = require("cookie-parser");

// app.use(cookiesParser("secretcode"));

// app.get("/",(req,res)=>{
//     res.send("Hi, i am root");
//     console.dir(req.cookies);
// })

// app.get("/greet",(req,res)=>{
//     let{name} = req.signedCookies;
//     res.send(`Hi ' i am ${name}`);
// });

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","Namaste", {signed:true});
   
//     res.cookie("name","Manasjha", {signed:true});
//      res.send("This is cookies page");
// });

// app.get("/verify",(req,res)=>{
//     console.log(req.cookies);
// });

// app.use("/users",users);
// app.use("/posts",posts);

// app.get("/test",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1; 
//     }
//     res.send(`You send request ${req.session.count} times`);
// });