const express = require("express");
const router = express.Router();
const { signup, signin } = require("./users.controllers");
const passport = require("passport");

router.post("/signup", signup);

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
