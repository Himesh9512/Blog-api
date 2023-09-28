const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();

exports.jwtAuth = passport.authenticate("jwt", { session: false });

exports.user_login = (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err || !user) {
			return res.status(400).json({
				message: "Something is not right",
				user: user,
			});
		}
		req.login(user, (err) => {
			if (err) {
				res.send(err);
			}
			// generate a signed son web token with the contents of user object and return it in the response
			const token = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN);
			return res.json({ user, token });
		});
	})(req, res);
};

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
