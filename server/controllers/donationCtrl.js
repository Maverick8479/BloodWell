const Donation = require("../models/donationModel");
const User = require("../models/userModel");

exports.addDonation = async (req, res) => {
  const { bloodBank, donor, date, time } = req.body;
  try {
    //check if user has a pending donation
    const pendingDonation = await Donation.findOne({
      donor: donor,
      status: "Pending",
    });
    if (pendingDonation) {
      return res.status(400).json({
        message: "You already have a pending donation",
      });
    }
    //check if the user has donated in the last 3 months
    const user = await User.findById(donor).select("lastDonated");
    const lastDonated = new Date(user.lastDonated);
    const currentDate = new Date();
    const diff = currentDate.getTime() - lastDonated.getTime();
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    if (diffDays < 90) {
      return res.status(400).json({
        message: "You can donate after 3 months",
      });
    }

    const donation = await Donation.create({
      bloodBank,
      donor,
      date,
      time,
    });
    res.status(201).json({
      status: "success",
      donation,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json({
      status: "success",
      donations,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getDonationbyUserIds = async (req, res) => {
  const { userIds } = req.body;
  try {
    const donations = await Donation.find({ donor: { $in: userIds } });
    res.status(200).json({
      status: "success",
      donations,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateDonation = async (req, res) => {
  const { donorId, status } = req.body;
  const currentDate = new Date();
  try {
    const donations = await Donation.find({ donor: donorId });
    //find the donation with the status pending
    const donation = donations.find(
      (donation) => donation.status === "Pending"
    );
    if (!donation) {
      return res.status(400).json({
        message: "No pending donation found",
      });
    }
    if (status === "Completed" && donation) {
      console.log("completed");
      await Donation.findByIdAndUpdate(donation._id, { status: "Completed" });
      await User.findByIdAndUpdate(donorId, { lastDonated: currentDate });
      await User.findByIdAndUpdate(donorId, { $inc: { donationCount: 1 } });
    } else if (status === "Rejected" && donation) {
      const donation = await Donation.findOneAndUpdate(
        { donor: donorId },
        { status },
        { new: true }
      );
    }
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
