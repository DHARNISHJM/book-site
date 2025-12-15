const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

module.exports.getMovies = async function (name) {
	try {
		const options = {
			method: "GET",
			url: "https://api.themoviedb.org/3/search/movie",
			params: {
				query: name,
				api_key: process.env.TMDB_API_KEY,
			},
			headers: {
				accept: "application/json",
			},
			timeout: 50000,
		};
		const res = await axios.request(options);
		return res.data;
	} catch (error) {
		console.error("TMDB API Error Code:", error.code);
		console.error("TMDB API Error Message:", error.message);
		console.error("Full error:", error);
		throw error;
	}
};

module.exports.getMoviesById = async function (id) {
	try {
		const options = {
			method: "GET",
			url: `https://api.themoviedb.org/3/movie/${id}`,
			params: {
				api_key: process.env.TMDB_API_KEY,
			},
			headers: {
				accept: "application/json",
			},
			timeout: 50000, // 30 second timeout
		};
		const res = await axios.request(options);
		return res.data;
	} catch (error) {
		console.error("TMDB API Error Code:", error.code);
		console.error("TMDB API Error Message:", error.message);
		console.error("Full error:", error);
		throw error;
	}
};
