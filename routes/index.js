const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
	res.json({ data: "Hello world" });
});

module.exports = router;
