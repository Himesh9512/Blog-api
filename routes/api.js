const express = require("express");
const router = express.Router();

const blog_controller = require("../controllers/blogController");

router.get("/", function (req, res, next) {
	res.status = 200;
	res.json({ data: "blogs_api" });
});

router.post("/login", user_controller.user_login);

router.post("/signup", user_controller.user_signup);

router.get("/blogs", blog_controller.get_blogs);

router.post("/blogs", blog_controller.create_blog);

router.get("/blogs/:id", blog_controller.get_single_blog);

router.update("/blogs/:id", blog_controller.update_blog);

router.delete("/blogs/:id", blog_controller.delete_blog);

router.get("/blogs/:id/comments", comment_controller.get_comments);

router.post("/blogs/:id/comments", blog_controller.create_comment);

router.delete("/blogs/:id/comments/:id", blog_controller.delete_comment);

module.exports = router;
