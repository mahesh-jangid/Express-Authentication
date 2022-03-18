const express = require("express");
const User = require("../models/user.model.js");
const router = express.Router();

router.get("", async (req, res) => {
  try {
    const user = await User.find().lean().exec();
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
router.post("", async (req, res) => {
  try {
    const user = await user.create(req.body);
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
