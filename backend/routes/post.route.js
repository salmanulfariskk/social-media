const multer = require("multer");
const {
  createPostHandler,
  getAllPostsHandler,
  getSinglePostHandler,
} = require("../controllers/post.controller");
const path = require("path");

const router = require("express").Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "public", "photos"));
  },
  filename: function (req, file, cb) {
    cb(null, crypto.randomUUID() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router
  .route("/")
  .post(upload.single("file"), createPostHandler)
  .get(getAllPostsHandler);

router.route("/:id").get(getSinglePostHandler);

module.exports = router;
