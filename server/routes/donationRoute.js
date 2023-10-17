const Router = require("express").Router;
const router = Router();

const {
  addDonation,
  getDonationbyUserIds,
  updateDonation,
} = require("../controllers/donationCtrl");

router.route("/addDonation").post(addDonation);
router.route("/getDonationbyId").post(getDonationbyUserIds);
router.route("/updateDonation").post(updateDonation);

module.exports = router;
