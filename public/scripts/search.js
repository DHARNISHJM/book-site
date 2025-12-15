document.querySelectorAll(".watched").forEach((btn) => {
	btn.addEventListener("click", (e) => {
		const card = e.target.closest(".movie-search");
		const movie = JSON.parse(decodeURIComponent(card.dataset.movie));
		console.log(card.dataset.movie);

		const dataPayload = {
			id: movie.id,
			title: movie.title,
			year: movie.release_date ? Number(movie.release_date.slice(0, 4)) : null,
			imageUrl: movie.poster_path,
		};

		axios.post("http://localhost:7567/log", dataPayload);
	});
});

document.querySelectorAll(".watchlist").forEach((btn) => {
	btn.addEventListener("click", (e) => {
		const card = e.target.closest(".movie-search");
		const movie = JSON.parse(decodeURIComponent(card.dataset.movie));

		const dataPayload = {
			id: movie.id,
			title: movie.title,
			year: Number(movie.release_date.slice(0, 4)),
			imageUrl: movie.poster_path,
		};

		axios.post("http://localhost:7567/watchList", dataPayload);
	});
});
