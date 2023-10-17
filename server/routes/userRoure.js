const Router = require("express").Router;
const router = Router();

const {
  signup,
  login,
  validStatus,
  getScoreBoard,
  updateUser,
} = require("../controllers/userCtrl");

router.route("/signup").post(signup);

router.route("/login").post(login);

router.route("/validStatus").post(validStatus);

router.route("/getScoreBoard").get(getScoreBoard);

router.route("/updateUser").post(updateUser);

module.exports = router;
