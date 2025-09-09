const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const { getBook } = require("./utils");

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/search", async (req, res) => {
	const { bookName } = req.query;
	console.log(bookName);
	const result = await getBook(bookName);
	console.log(result);
	res.render("show", { result });
});

app.get("/", (req, res) => {
	res.render("home");
});

app.listen("7567", () => {
	console.log("Connected.\nListening on 7567");
});
