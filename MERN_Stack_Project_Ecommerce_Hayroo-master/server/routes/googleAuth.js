const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

const googleAuthSignIn =  async (req, res, next) =>{
			const token = jwt.sign(
			{ _id: req.user._id, role: req.user.userRole },
			JWT_SECRET
			);
			res.redirect(`${process.env.CLIENT_URL}?token=${token}`)
}


router.get("/google/callback", passport.authenticate("google", { session: false, scope: 
	['openid', 'profile', 'email'] }), googleAuthSignIn);

	router.post("/google/signin", (req, res) =>{
		const encode = jwt.verify(req.body.token, JWT_SECRET);
          return res.json({
            token: req.body.token,
            user: encode,
          });
	});


router.get("auth/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

module.exports = router;