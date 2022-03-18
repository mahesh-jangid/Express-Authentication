const express = require("express");
const connect = require("./configs/db");
const userController = require("./controllers/user.controller");
const postController = require("./controllers/post.controller");

const { register, login } = require("./controllers/auth.controller");
const app = express();

app.use(express.json());

app.use("/users", userController);
app.use("/post", postController);
app.post("/register", register);
app.post("/login", login);

app.listen(5000, async () => {
  try {
    await connect();
    console.log("listening on port 5000");
  } catch (err) {
    console.log(err.message);
  }
});
//   "bcrypt": "^5.0.1",
//   "dotenv": "^16.0.0",
//   "express": "^4.17.3",
//   "express-validator": "^6.14.0",
//   "jsonwebtoken": "^8.5.1",
//   "mongoose": "^6.2.7"
// }
