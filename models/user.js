const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},

	watched: [
		{
			type: {
				id: Number,
				title: String,
				year: Number,
				imageUrl: String,
			},
			ref: "Movie",
		},
	],

	watchlist: [
		{
			type: {
				id: Number,
				title: String,
				year: Number,
				imageUrl: String,
			},
			ref: "Movie",
		},
	],
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
