const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const { getBook } = require("./utils");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const session = require("express-session");
const dotenv = require("dotenv");

dotenv.config();

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Parse incoming request bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessionConfig = {
	secret: "thisshouldbeanactualsecret",
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7,
	},
};

app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	res.locals.currentUser = req.user;
	next();
});

mongoose
	.connect("mongodb://localhost:27017/movieLog")
	.then(() => {
		console.log("MONGO CONNECTION OPEN!!!");
	})
	.catch((err) => {
		console.log("OH NO MONGO CONNECTION ERROR!!!!");
		console.log(err);
	});

app.use("/", userRoutes);

app.listen("7567", () => {
	console.log("Connected.\nListening on 7567");
});
