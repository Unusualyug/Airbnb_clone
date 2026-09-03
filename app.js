if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// 🔹 Import Dependencies & Setup Middleware
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expressError");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const usersRouter = require("./routes/user.js");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

let dbUrl = process.env.ATLASDB_URL;

// Connect to MongoDB
mongoose
  .connect(dbUrl, {
    // tls: true, //cause the mongodbAtlas want to encript thheir data connection()
    // ssl: true, // Provides backward compatibility
  })
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ Database connection error:", err));

// const store = MongoStore.create({
//   mongoUrl: dbUrl,
//   crypto: {
//     secret: "mysecreateApp",
//   },
//   touchAfter: 24 * 3600,
// });
// store.on("error", (err) => {
//   console.log("error in mongoSession store", err);
// });
app.use(
  session({
    // store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000, //7 days
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, //prevents from the cross-scripting attecks
    },
  }),
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session()); //app.use(passport.session()) wil helps to make the connectivity from the session / session data
passport.use(new LocalStrategy(User.authenticate())); //Important(it tells the woever the user comes(from the "User model"), they must be get autheticate by using the local stratagy)
passport.serializeUser(User.serializeUser()); //it stores the user's session id in the session after the logIn
passport.deserializeUser(User.deserializeUser()); //Retrieves user details from the session on each request.

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  // console.log(res.locals.success); // []

  res.locals.currentUser = req.user; //used to ckeck the user is logged in or not. and pass it to the navbar.ejs
  next();
});

// 👇 ADD THIS
app.get("/", (req, res) => {
  res.redirect("/listings");
});

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "fakeuser@gmail.com",
//     username: "deltaStudent",
//   });
//   let newUser = await User.register(fakeUser, "helloworld"); //here the resister will automatically ensure that this name is already exist or not...
//   res.send(newUser);
// });

//  Routes (Ordered Correctly)
app.use("/listings", listingsRouter); // This handles the listings routes.
app.use("/listings/:id/reviews", reviewsRouter); // This should be handled within the reviews route file itself, using :id
app.use("/", usersRouter);

// CATCH-ALL - Handles Undefined Routes (MUST BE LAST)
app.all("*", (req, res, next) => {
  return next(new ExpressError(404, "Page not found..."));
});

//  ERROR HANDLING MIDDLEWARE (ALWAYS LAST)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).render("listings/error", { status, message });
});

//  Start Server
const port = 3000;
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
