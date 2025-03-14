const express = require('express');
const router = express.Router();
const User = require('../models/user-model');
const isloggedin = require('../middlewares/isloggedin');

router.get('/data', isloggedin, async (req, res) => {
  try {
    const User_id = req.user._id;
    const user = await User.findById(User_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const OthersData = await Others.findOne({ userId: User_id });

    if (!OthersData) {
      return res.status(404).json({ message: "No Data Found" });
    }

    const ActivityMarks = Math.min(OthersData.Activities.length * 5, 10);
    const ResponsibilityMarks = Math.min(OthersData.Responsibilities.length * 10, 20);
    const ContributionMarks = Math.min(OthersData.Contribution.length * 5, 10);
    user.OutreachSelfAsses = ActivityMarks;
    user.AddSelfAsses = ResponsibilityMarks;
    user.SpeacialSelfAsses = ContributionMarks;
    
    await user.save();

    return res.status(200).json({
      Activities: OthersData.Activities || [],
      Responsibilities: OthersData.Responsibilities || [],
      Contribution: OthersData.Contribution || [],
      Awards: OthersData.Awards || [],
      ActivityMarks,
      ResponsibilityMarks,
      ContributionMarks,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


router.post("/addactivity", isloggedin, async (req, res) => {
  try {
    const userId = req.user._id;
    const { activityDetails } = req.body;
    let othersEntry = await Others.findOne({ userId: userId });
    if (!othersEntry) {
      othersEntry = new Others({
        userId,
        Activities: [{ activityDetails }]
      });
    } else {
      othersEntry.Activities.push({ activityDetails });
    }

    await othersEntry.save();
    res.status(201).json({ message: "Activity added successfully!", data: othersEntry });
  }
  catch (error) {
    console.error("Error while adding activity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/addresponsibility", isloggedin, async (req, res) => {
  try {
    const userId = req.user._id;
    const { Responsibility, assignedBy } = req.body;
    let othersEntry = await Others.findOne({ userId: userId });
    if (!othersEntry) {
      othersEntry = new Others({
        userId,
        Responsibilities: [{ Responsibility, assignedBy }]
      });
    } else {
      othersEntry.Responsibilities.push({ Responsibility, assignedBy });
    }

    await othersEntry.save();
    res.status(201).json({ message: "Responsibility added successfully!", data: othersEntry });
  }
  catch (error) {
    console.error("Error while adding responsibility:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/addcontribution", isloggedin, async (req, res) => {
  try {
    const userId = req.user._id;
    const { contributionDetails, Benefit } = req.body;
    let othersEntry = await Others.findOne({ userId: userId });
    if (!othersEntry) {
      othersEntry = new Others({
        userId,
        Contribution: [{ contributionDetails, Benefit }]
      });
    } else {
      othersEntry.Contribution.push({ contributionDetails, Benefit });
    }

    await othersEntry.save();
    res.status(201).json({ message: "Contribution added successfully!", data: othersEntry });
  }
  catch (error) {
    console.error("Error while adding Contribution:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/addaward", isloggedin, async (req, res) => {
  try {
    const userId = req.user._id;
    const { Award, IssuingOrg } = req.body;
    let othersEntry = await Others.findOne({ userId: userId });
    if (!othersEntry) {
      othersEntry = new Others({
        userId,
        Awards: [{ Award, IssuingOrg }]
      });
    } else {
      othersEntry.Awards.push({ Award, IssuingOrg });
    }

    await othersEntry.save();
    res.status(201).json({ message: "Award added successfully!", data: othersEntry });
  }
  catch (error) {
    console.error("Error while adding award:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;