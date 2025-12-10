const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},

	currentlyReading: [
		{
			type: Schema.Types.ObjectId,
			ref: "Book",
		},
	],

	finishedReading: [
		{
			type: Schema.Types.ObjectId,
			ref: "Book",
		},
	],

	toRead: [
		{
			type: Schema.Types.ObjectId,
			ref: "Book",
		},
	],
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
