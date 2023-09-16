const asyncHandler = require("express-async-handler");

exports.get_comments = (req, res, next) => {
	res.json({ Note: "NOT IMPLEMENTED: get comments" });
};

exports.create_comment = (req, res, next) => {
	res.json({ Note: "NOT IMPLEMENTED: create comments" });
};

exports.delete_comment = (req, res, next) => {
	res.json({ Note: "NOT IMPLEMENTED: delete comments" });
};
