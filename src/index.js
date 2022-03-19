const express = require("express");
const { body, validationResult } = require("express-validator");
const connect = require("./configs/db");
const User = require("./models/user.model.js");
const userController = require("./controllers/user.controller");
const postController = require("./controllers/post.controller");

const { register, login } = require("./controllers/auth.controller");
const app = express();

app.use(express.json());

app.use("/users", userController);
app.use("/post", postController);
app.post("/login", login);
app.post(
  "/register",
  body("name").trim().not().isEmpty().withMessage("Name cannot be empty"),
  body("email")
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
    .isLength({ min: 5 })
    .withMessage("Length should be of atleast 5 characters")
    .custom((value) => {
      const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/;
      if (!value.match(passw)) {
        throw new Error("Password must be strong");
      }
      return true;
    }),
  register
);

app.listen(5000, async () => {
  try {
    await connect();
    console.log("listening on port 5000");
  } catch (err) {
    console.log(err.message);
  }
});
