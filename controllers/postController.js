const asyncHandler = require("express-async-handler");

exports.get_posts = (req, res, next) => {
	res.json({ Note: "NOT IMPLEMENTED: get posts" });
};

exports.get_single_post = (req, res, next) => {
	res.json({ Note: "NOT IMPLEMENTED: get single post" });
};

exports.create_post = (req, res, next) => {
	res.json({ Note: "NOT IMPLEMENTED: create post" });
};

exports.update_post = (req, res, next) => {
	res.json({ Note: "NOT IMPLEMENTED: update post" });
};

exports.delete_post = (req, res, next) => {
	res.json({ Note: "NOT IMPLEMENTED: delete post" });
};
