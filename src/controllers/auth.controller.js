const User = require("../models/user.model");

const { body, validationResult } = require("express-validator");

const register = async (req, res) => {
  {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.create(req.body);
      return res.status(200).send(user);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).send({ error: "Fields can not be empty" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(500).send({ error: "User does not exist" });
    } else {
      if (user.password == password) {
        return res.status(200).send("signin successfull");
      } else {
        return res.status(500).send({ error: "Invalid credentials provided" });
      }
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = { register, login };
