const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const { getMovies, getMoviesById } = require("../utils");
const axios = require("axios");

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

router.get("/", (req, res) => {
	res.render("home");
});

router.get("/show/:id", async (req, res) => {
	const { id } = req.params;
	const result = await getMoviesById(id);
	console.log(result);
	res.render("show", { result });
});

router.get("/search", async (req, res) => {
	try {
		const { movieName } = req.query;
		if (!movieName) {
			return res.status(400).json({ error: "Movie name is required" });
		}
		const result = await getMovies(movieName);
		res.locals.result = result.results;
		res.render("search.ejs");
	} catch (error) {
		console.error("Search error:", error.message);
		res.render("error", { error: "Failed to search movies. Please try again." });
	}
});

router.post("/log", async (req, res) => {
	try {
		req.user.watched.push(req.body);
		await req.user.save();
		req.flash("success", "Movie Added");
	} catch (e) {
		req.flash("error", e.message);
	}
});

router.post("/watchList", async (req, res) => {
	req.user.watchlist.push(req.body);
	await req.user.save();
});

router.get("/login", (req, res) => {
	res.render("login.ejs");
});

router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), async (req, res) => {
	req.flash("success", "Welcome Back!");
	res.redirect("/");
});

router.get("/logout", (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		req.flash("success", "Goodbye!");
		res.redirect("/");
	});
});
module.exports = router;
