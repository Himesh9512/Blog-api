const express = require("express");
const router = express.Router();

const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");
const user_controller = require("../controllers/userController");

router.get("/", (req, res, next) => {
	res.status = 200;
	res.json({ data: "blog_api" });
});

router.get("/login/success", (req, res, next) => {
	res.json({ message: "Login successful!", username: req.user.username });
});

router.get("/login/failure", (req, res, next) => {
	res.json({ message: "Login failed!" });
});

router.post("/login", user_controller.user_login);

router.post("/signup", user_controller.user_signup);

router.get("/posts", post_controller.get_posts);

router.post("/posts", post_controller.create_post);

router.get("/posts/:postid", post_controller.get_single_post);

router.put("/posts/:postid", post_controller.update_post);

router.delete("/posts/:postid", post_controller.delete_post);

router.get("/posts/:postid/comments", comment_controller.get_comments);

router.post("/posts/:postid/comments", comment_controller.create_comment);

router.delete("/posts/:postid/comments/:commentid", comment_controller.delete_comment);

module.exports = router;
