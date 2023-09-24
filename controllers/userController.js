const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");

exports.user_login = passport.authenticate("local", {
	successRedirect: "/api/login/success",
	failureMessage: "/api/login/failure",
});

exports.user_signup = [
	body("username")
		.trim()
		.notEmpty()
		.withMessage("Username should not be Empty!")
		.custom(async (value) => {
			const user = await User.findOne({ username: value });

			if (user) {
				throw new Error("User already exist!");
			}
		})
		.escape(),
	body("password")
		.trim()
		.notEmpty()
		.withMessage("Password should not be Empty!")
		.isLength({ min: 8 })
		.withMessage("Password must contain atleast 8 characters")
		.escape(),
	body("confirm-password")
		.trim()
		.notEmpty()
		.withMessage("confirm-password should not be Empty!")
		.isLength({ min: 8 })
		.withMessage("Confirm password must contain atleast 8 characters")
		.custom((confirmPassword, { req }) => {
			const password = req.body.password;

			if (confirmPassword !== password) {
				throw new Error("Confirm password does not match");
			} else {
				return true;
			}
		}),
	asyncHandler(async (req, res, next) => {
		const password = req.body.password;

		bcrypt.hash(password, 10, (err, hashPassword) => {
			if (err) {
				next(err);
			} else {
				req.body.password = hashPassword;
				next();
			}
		});
	}),
	asyncHandler(async (req, res, next) => {
		const results = validationResult(req);

		const user = User({
			username: req.body.username,
			password: req.body.password,
		});

		if (results.isEmpty()) {
			user.save();
			res.json(user);
		}

		res.json({
			msg: "error while validating",
			errors: results.array(),
		});
	}),
];
