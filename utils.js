const axios = require("axios");
const axiosRetry = require("axios-retry").default;

// --- 1. ROBUST CLIENT SETUP (The Fix) ---
// This acts like the Python 'session' with the adapter attached
const tmdbClient = axios.create({
	baseURL: "https://api.themoviedb.org/3",
	timeout: 50000,
	headers: {
		Accept: "application/json",
	},
});

// Attach retry logic to the client
axiosRetry(tmdbClient, {
	retries: 3,
	retryDelay: (retryCount) => {
		console.log(`TMDB Connection Issue. Retrying attempt: ${retryCount}...`);
		return retryCount * 1000; // Wait 1s, 2s, 3s
	},
	// Retry on Network errors (ECONNRESET) or specific Status Codes (429, 5xx)
	retryCondition: (error) => {
		return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === "ECONNRESET" || (error.response && [429, 500, 502, 503, 504].includes(error.response.status));
	},
});

// --- 2. EXPORTED FUNCTIONS ---

module.exports.getMovies = async function (name) {
	try {
		// We use 'tmdbClient' instead of 'axios' here
		const res = await tmdbClient.get("/search/movie", {
			params: {
				query: name,
				api_key: process.env.TMDB_API_KEY,
			},
		});
		return res.data;
	} catch (error) {
		console.error(`Failed to search movies for "${name}" after retries.`);
		throw error;
	}
};

module.exports.getMoviesById = async function (id) {
	try {
		// Reuse the same robust client
		const res = await tmdbClient.get(`/movie/${id}`, {
			params: {
				api_key: process.env.TMDB_API_KEY,
			},
		});
		return res.data;
	} catch (error) {
		console.error(`Failed to get movie details for ID "${id}" after retries.`);
		// Optional: Log specific error details if needed
		// console.error("Error Code:", error.code);
		throw error;
	}
};
