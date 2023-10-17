const Router = require("express").Router;
const router = Router();
const {
  createPost,
  getAllPosts,
  getPostsByUser,
  addLike,
} = require("../controllers/postCtrl");

router.route("/createPost").post(createPost);
router.route("/getAllPosts").get(getAllPosts);
router.route("/getPostsByUser/:id").get(getPostsByUser);
router.route("/addLike/:id").patch(addLike);

module.exports = router;
