const express = require("express");
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");

dotenv.config();

const app = express();

//database setup
mongoose.set("strictQuery", false);
async function main() {
	const mongdoDB = process.env.CONNECTION_KEY;
	await mongoose.connect(mongdoDB);
}
main().catch((e) => console.log(e));

passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await User.findOne({ username: username });
			if (!user) {
				return done(null, false, { message: "Incorrect username" });
			}
			const match = bcrypt.compare(password, user.password);
			if (!match) {
				return done(null, false, { message: "Incorrect password" });
			}
			return done(null, user);
		} catch (err) {
			return done(err);
		}
	}),
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

app.use(session({ secret: "thetopsecretkey", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("*", (req, res, next) => {
	res.status(404).json({ Error: "Page not Found" });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({ error: err.message });
});

module.exports = app;
