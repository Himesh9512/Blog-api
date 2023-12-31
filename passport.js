const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const session = require("express-session");
const bcrypt = require("bcryptjs");

const dotenv = require("dotenv");
dotenv.config();

const User = require("./models/User");

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

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.ACCESS_TOKEN,
		},
		async function (jwtPayload, done) {
			//find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
			return await User.findOne({ id: jwtPayload.sub })
				.then((user) => {
					return done(null, user);
				})
				.catch((err) => {
					return done(err);
				});
		},
	),
);
