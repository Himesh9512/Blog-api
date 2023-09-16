const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");

exports.get_posts = asyncHandler(async (req, res, next) => {
	const posts = await Post.find({ isPublished: false });

	res.json(posts);
});

exports.get_single_post = asyncHandler(async (req, res, next) => {
	const { id } = req.params;

	const post = await Post.findById(id);

	if (post) {
		res.json(post);
	} else {
		res.status(204).json({ data: "No document found!" });
	}
});

exports.create_post = (req, res, next) => {
	res.json({ Note: "NOT IMPLEMENTED: create post" });
};

exports.update_post = (req, res, next) => {
	res.json({ Note: "NOT IMPLEMENTED: update post" });
};

exports.delete_post = (req, res, next) => {
	res.json({ Note: "NOT IMPLEMENTED: delete post" });
};
