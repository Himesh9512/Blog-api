const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const options = {
	toJSON: { virtuals: true },
};

const CommentSchema = new Schema({
	postId: { type: Schema.Types.ObjectId, ref: "Post" },
	username: { type: String, required: true },
	text: { type: String },
	date: Date,
});

CommentSchema.virtual("date_formatted").get(function () {
	return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Comment", CommentSchema);
