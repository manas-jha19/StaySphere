const User = require("../models/user.js");


module.exports.renderSignupForm = (req,res)=>{

    res.render("user/user.ejs");
};

module.exports.SignUpUser = async(req,res,next)=>{
    try{

         let{email,username,password} = req.body;
    let newUser = new User({email ,username});
    let putUser = await User.register(newUser,password);
    console.log(putUser);
    req.login(putUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to StaySphere")
    res.redirect("/listings");
    })
    
    }
    catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    };
};


module.exports.renderLoginForm = (req,res)=>{
    res.render("user/login.ejs");
};

module.exports.loginUser = (req,res)=>{
    req.flash("success","Welcome to StaySphere ,You are logged in!");
    res.redirect(res.locals.redirectUrl || "/listings");
};

module.exports.logoutUser = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You logged out!");
        res.redirect("/listings");
    });
};