const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const calculate = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();

  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

exports.signup = async (req, res, next) => {
  const {
    name,
    dob,
    gender,
    bloodGroup,
    adharno,
    email,
    password,
    contact,
    cityvalue,
    statevalue,
    specificCity,
    lastDonated,
  } = req.body;
  console.log(req.body);
  try {
    const isalready = await User.findOne({ email });
    if (isalready) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters",
      });
    }
    //calculate age by dob
    const age = calculate(dob);
    if (age < 18) {
      return res.status(400).json({
        error: "Age must be 18 or above",
      });
    }

    const user = await User.create({
      name,
      dob,
      gender,
      bloodGroup,
      adharno,
      email,
      password,
      contact,
      city: cityvalue,
      state: statevalue,
      specificCity,
      lastDonated,
    });
    sendTokenResponse(user, 201, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Error signing up user",
      err: err.message,
    });
  }
};

// Login a user
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please enter all fields",
    });
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
      });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
      });
    }
    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({
      message: "Error logging in user",
      error: err,
    });
  }
};

// Send token response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const userObj = {
    _id: user._id,
    email: user.email,
  };

  res.status(statusCode).json({
    success: true,
    token,
    user: userObj,
  });
};

//check if the token is still valid
exports.validStatus = async (req, res, next) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error logging in user",
      error: err,
    });
  }
};

//get score board
exports.getScoreBoard = async (req, res, next) => {
  try {
    //get all the users
    const users = await User.find();
    //sort the users by score
    const sortedUsers = users.sort((a, b) => b.donationCount - a.donationCount);
    //send the sorted users
    res.status(200).json({
      success: true,
      users: sortedUsers,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error getting score board",
      error: err,
    });
  }
};

//update user
exports.updateUser = async (req, res, next) => {
  const {
    userId,
    name,
    email,
    adharno,
    bloodGroup,
    contact,
    city,
    state,
    specificCity,
    dob,
  } = req.body;
  try {
    //find the user
    const user = await User.findById((_id = userId));
    // console.log(user);
    //only update the fields that are not empty
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (adharno) {
      user.adharno = adharno;
    }
    if (bloodGroup) {
      user.bloodGroup = bloodGroup;
    }
    if (contact) {
      user.contact = contact;
    }
    if (city) {
      user.city = city;
    }
    if (state) {
      user.state = state;
    }
    if (specificCity) {
      user.specificCity = specificCity;
    }
    if (dob) {
      user.dob = dob;
    }
    //save the user
    await user.save();
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error updating user",
      error: err,
    });
  }
};
