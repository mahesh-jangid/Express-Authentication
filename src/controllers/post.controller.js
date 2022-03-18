const express = require("express");
const router = express.Router();

const Post = require("../models/post.model.js");

router.get("", async (req, res) => {
  try {
    const post = await Post.find().lean().exec();
    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
router.post("", async (req, res) => {
  try {
    const post = await Post.create(req.body);
    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get("/:_id", async (req, res) => {
  try {
    const post = await Post.findById(req.params._id)
      .populate({
        path: "userId",
        select: { name: 1, email: 1 },
      })
      .lean()
      .exec();
    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.patch("/:_id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params._id, req.body);
    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).res.send(err.message);
  }
});

router.delete("", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
