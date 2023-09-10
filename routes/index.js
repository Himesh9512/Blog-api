const express = require("express");

const route = express.Router();

route.get("/", (req, res, next) => {
	res.json({ data: "Hello world" });
});

module.exports = route;
