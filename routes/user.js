const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const { getBook, getBookIsbn } = require("../utils");

router.get("/register", (req, res) => {
	res.render("register.ejs");
});

router.post("/register", async (req, res, next) => {
	try {
		const { email, username, password } = req.body;
		const user = new User({ email, username });
		const registeredUser = await User.register(user, password);
		req.login(registeredUser, (err) => {
			if (err) {
				return next(err);
			} else {
				req.flash("success", "Welcome to Book Site");
				res.redirect("/");
			}
		});
	} catch (e) {
		req.flash("error", e.message);
		res.redirect("/register");
	}
});

router.get("/login", (req, res) => {
	res.render("login.ejs");
});

router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), async (req, res) => {
	req.flash("success", "Welcome Back!");
	res.redirect("/");
});

router.get("/search", async (req, res) => {
	const { bookName } = req.query;
	const result = await getBook(bookName);
	console.log(result);
	res.locals.result = result;
	res.render("search");
});

router.get("/logout", (req, res, next) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		req.flash("success", "Goodbye!");
		res.redirect("/");
	});
});

module.exports = router;
