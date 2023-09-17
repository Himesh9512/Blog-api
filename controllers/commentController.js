const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Comment = require("../models/Comment");

exports.get_comments = asyncHandler(async (req, res, next) => {
	const { postid } = req.params;
	const comments = await Comment.find({ postId: postid });
	res.json(comments);
});

exports.create_comment = [
	body("username").trim().isLength({ min: 1 }).withMessage("Username should not be empty").escape(),
	body("text").trim().escape(),
	asyncHandler(async (req, res, next) => {
		const results = validationResult(req);

		const { postid } = req.params;

		const comment = await Comment({
			postId: postid,
			username: req.body.username,
			text: req.body.text,
			date: new Date(),
		});

		if (results.isEmpty()) {
			await comment.save();
			res.json(comment);
		} else {
			res.json(results.array());
		}
	}),
];

exports.delete_comment = (req, res, next) => {
	res.json({ Note: "NOT IMPLEMENTED: delete comments" });
};
