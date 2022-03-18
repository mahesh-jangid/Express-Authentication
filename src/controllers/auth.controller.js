const User = require("../models/user.model");

const { body, validationResult } = require("express-validator");

const register = (req, res) => {
  body("name").trim().not().isEmpty().withMessage("Name cannot be empty");

  body("email")
    .not()
    .isEmail()
    .withMessage("invalid Email")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email is already exist");
      }
      return true;
    }),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Length should be of atleast 5 characters")
      .custom((value) => {
        const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/;
        if (!value.match(passw)) {
          throw new Error("Password must be strong");
        }
        return true;
      }),
    async (req, res) => {
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
    };
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
