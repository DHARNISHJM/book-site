const apiKey = "AIzaSyDgrtvm5FRJe-qKn6VH2PHa9yF5MLTBGEY";
const axios = require("axios");

module.exports.getBook = async function (name) {
	config = { params: { q: `${name}`, key: apiKey } };
	const res = await axios.get("https://www.googleapis.com/books/v1/volumes", config);
	return res.data.items;
};
