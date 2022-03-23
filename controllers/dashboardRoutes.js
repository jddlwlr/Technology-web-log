const router = require("express").Router();
const { Post, Comment, User } = require("../models/");
const withAuth = require("../utils/auth");

router.get("/post", withAuth, (req, res) => {
  res.render("homepage", {
    layout: "dashboard",
  });
});

module.exports = router;
