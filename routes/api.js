const express = require("express");
const router = express.Router();

const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");
const user_controller = require("../controllers/userController");

router.get("/", function (req, res, next) {
	res.status = 200;
	res.json({ data: "blog_api" });
});

router.post("/login", user_controller.user_login);

router.post("/signup", user_controller.user_signup);

router.get("/posts", post_controller.get_posts);

router.post("/posts", post_controller.create_post);

router.get("/posts/:id", post_controller.get_single_post);

router.put("/posts/:id", post_controller.update_post);

router.delete("/posts/:id", post_controller.delete_post);

router.get("/posts/:id/comments", comment_controller.get_comments);

router.post("/posts/:id/comments", comment_controller.create_comment);

router.delete("/posts/:id/comments/:id", comment_controller.delete_comment);

module.exports = router;
