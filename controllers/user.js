const user = require("../models/user");


//signup form 
module.exports.rendersignupform = (req, res) => {
    res.render("users/signup");
};



//sign up route
module.exports.signup = async(req, res) => {
    try {
        let { username, email, password } = req.body;
        const newuser = new user({ email, username });
        let registereduser = await user.register(newuser, password);    //registering new user (newuser) with password 
        console.log(registereduser);

        // when user signup . then it performs automatic login user by using login method which takes 2 this.arguments, registerd/singupped user and callback
        req.login(registereduser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust");

            //post-login page code
            let redirecturl = res.locals.redirectUrl || "/listings";
            res.redirect(redirecturl);    
        })
    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }

};



//login form
module.exports.renderloginform = (req, res) => {
    res.render("users/login");
}

//login route
module.exports.login = async (req,res)=>{
    req.flash("success","Welcome to Wanderlust");
    res.redirect("/listings");
};


//logout
module.exports.logout = (req,res,next)=>{

    req.logout((err) => {    //req.logout() is passport method to logout
        if(err) {
           return next(err);
        }
        req.flash("success", "you are logged out now");
        res.redirect("/listings");
    });

}