require("dotenv/config");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { sequelize } = require("./models");
const authenticate = require("./middlewares/authenticate");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.use('/photos', express.static(path.join(__dirname, 'public', 'photos')))

app.use("/api/account", require("./routes/account.route"));
app.use("/api/sessions", require("./routes/session.route"));
app.use("/api/posts", authenticate, require("./routes/post.route"));
app.use("/api/friendships", authenticate, require("./routes/friendship.route"))
app.use('/api/likes', authenticate, require("./routes/like.route"))

const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  console.log("Server started at http://localhost:%d", PORT);
  await sequelize.authenticate();
  console.log("Database connected");
});
