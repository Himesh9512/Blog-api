const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
	title: { type: String, required: true },
	author: { type: String, required: true },
	content: { type: String, required: true },
	date: Date(),
	comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

BlogSchema.virtual("date_formatted").get(function () {
	return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.Model("Blog", BlogSchema);
