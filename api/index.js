if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// 🔹 Import Dependencies & Setup Middleware
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("../utils/expressError");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user.js");

const usersRouter = require("../routes/user.js");
const listingsRouter = require("../routes/listing.js");
const reviewsRouter = require("../routes/review.js");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

let dbUrl = process.env.ATLASDB_URL;

// Connect to MongoDB
mongoose
  .connect(dbUrl, {})
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ Database connection error:", err));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});
store.on("error", (err) => {
  console.log("error in mongoSession store", err);
});

app.use(
  session({
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000, //7 days
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  }),
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// Redirect root to /listings
app.get("/", (req, res) => {
  res.redirect("/listings");
});

//  Routes
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", usersRouter);

// CATCH-ALL - Handles Undefined Routes
app.all("*", (req, res, next) => {
  return next(new ExpressError(404, "Page not found..."));
});

//  ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).render("listings/error", { status, message });
});

// ❌ NO app.listen() here — Vercel handles that
module.exports = app;
