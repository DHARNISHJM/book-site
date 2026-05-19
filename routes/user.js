const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const { getMovies, getMoviesById } = require("../utils");
const axios = require("axios");
const users = require("../controller/users");

router.route("/register").get(users.renderRegister).post(users.register);

router.get("/", users.goHome);

router.get("/show/:id", users.show);

router.get("/search", users.searchMovies);

router.post("/log", users.logMovie);

router.post("/watchList", users.addToWatchList);

router
	.route("/login")
	.get(users.renderLogin)
	.post(passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), users.login);

router.get("/logout", users.logout);
module.exports = router;
