const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const options = {
	toJSON: { virtuals: true },
};
const PostSchema = new Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		date: Date,
	},
	options,
);

PostSchema.virtual("date_formatted").get(function () {
	return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Post", PostSchema);
