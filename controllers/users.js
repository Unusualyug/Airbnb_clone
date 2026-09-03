const User = require("../models/user");

module.exports.loadSignUp = (req, res) => {
  res.render("users/signup");
};
module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let newUser = new User({ email, username });
    const registerUser = await User.register(newUser, password); //ensure that the user is lready exist or not(inbuild function register() to ckeck that the user is lready exist or not)
    console.log(registerUser);
    req.login(registerUser, (err) => {
      //req.login methoid wii be add the user id in the session store
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to the WanderLust");
      res.redirect("/listings");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};
module.exports.loadLogIn = (req, res) => {
  res.render("users/login");
};
module.exports.logIn = async (req, res) => {
  req.flash("success", "Welcome to Wanderlust! You are logged in.");
  // res.redirect(res.locals.redirectUrl); // This should now correctly redirect the user to the previous page or "/"
  let redirectUrl = res.locals.redirectUrl || "/listings"; //res.locals.redirectUrl not work
  res.redirect(redirectUrl);
};
module.exports.logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err); // If there's an error during logout, pass it to the next middleware
    }
    req.flash("success", "You are logged out now.");
    res.redirect("/listings"); // Redirect the user to the listings page after logout
  });
};
