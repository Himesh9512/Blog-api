const express = require("express");
const createError = require("http-errors");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");

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

const limiter = RateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 20,
});

app.use(limiter);
app.use(compression());
app.use(helmet());
app.use(cors());

require("./passport");

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
