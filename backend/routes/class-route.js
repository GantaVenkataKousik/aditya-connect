const express = require('express');
const router = express.Router();
const Class = require('../models/class-model');
const isloggedin = require('../middlewares/isloggedin');
const User = require('../models/user-model');
const Feedback = require('../models/Feedback');
const mongoose = require('mongoose');


router.post('/classes', isloggedin, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const {
            courseName,
            semester,
            numberOfStudents,
            passCount,
           
        } = req.body;

        if (!numberOfStudents || !passCount) {
            return res.status(400).json({ error: 'numberOfStudents and passCount are required fields' });
        }

        const passPercentage = ((passCount / numberOfStudents) * 100).toFixed(2);

        // Calculate average pass percentage for all classes of the user
        const classes = await Class.find({ teacher: user._id });
        const totalPassPercentage = classes.reduce((acc, cls) => acc + cls.passPercentage, 0);
        const averagePassPercentage = classes.length > 0 ? (totalPassPercentage / classes.length).toFixed(2) : 0;
        let totalMarks = 0;
        if (averagePassPercentage >= 95) {
            totalMarks += 20;
        } else if (averagePassPercentage >= 85) {
            totalMarks += 15;
        } else  {
            totalMarks += 10;
        }
        // Create a new class document
        const newClass = new Class({
            courseName,
            semester,
            numberOfStudents,
            passCount,
            passPercentage, // Calculated value
           
            selfAssessmentMarks:totalMarks,
            averagePercentage: averagePassPercentage,
            teacher: user._id
        });

        // Save the new class to the database
        const savedClass = await newClass.save();
         user.AvgSelfAsses = totalMarks; // Update the user's average self-assessment marks
         await user.save(); // Save the updated user document
         
        // Respond with the saved class and average pass percentage
        res.status(201).json({ savedClass, averagePassPercentage });
    } catch (error) {
        console.error('Error saving class:', error);
        res.status(400).json({ error: error.message });
    }
});
router.post('/feedback', isloggedin, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const {
            courseName,
            semester,
            numberOfStudents,
            feedbackpercent
        } = req.body;

        if (!numberOfStudents || feedbackpercent === undefined) {
            return res.status(400).json({ error: 'numberOfStudents and feedbackpercent are required fields' });
        }
        
        // Fetch all feedback for the user
        const feedbacks = await Feedback.find({ teacher: user._id });
        const totalFeedbackPercentage = feedbacks.reduce((acc, fb) => acc + fb.feedbackPercentage, 0);
      
        const averageFeedbackPercentage = feedbacks.length > 0 ? (totalFeedbackPercentage / feedbacks.length).toFixed(2) : 0;

        let totalMarks = 0;
        if (averageFeedbackPercentage >= 95) {
            totalMarks += 20;
        } else if (averageFeedbackPercentage >= 85) {
            totalMarks += 15;
        } else  {
            totalMarks += 10;
        }

        // Update the User model with the computed totalMarks
        user.feedSelfAsses = totalMarks;
        await user.save(); // Save the updated user document

        // Create a new feedback document
        const newFeedback = new Feedback({
            courseName,
            semester,
            numberOfStudents,
            feedbackPercentage: feedbackpercent,
            averagePercentage: parseFloat(averageFeedbackPercentage), // Ensure it's a number
            selfAssessmentMarks: totalMarks,
            teacher: user._id
        });

        // Save the new feedback to the database
        const savedFeedback = await newFeedback.save();

        // Respond with the saved feedback and updated user details
        res.status(201).json({ savedFeedback, averageFeedbackPercentage, updatedUserMarks: user.couAvgPerMarks });
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(400).json({ error: error.message });
    }
});

router.get("/fdata", isloggedin, async (req, res) => {
    const userId = req.user._id;

    try {
        // Fetch Feedback for the logged-in teacher
        const data = await Feedback.find({ teacher: userId });

        res.status(200).json({ data });
    } catch (error) {
        console.error("Error fetching classes:", error);
        res.status(500).json({ message: "Unable to fetch Feedback" });
    }
});

router.get("/raw", isloggedin, async (req, res) => {
    const userId = req.user._id;

    try {
        // Fetch classes for the logged-in teacher
        const data = await Class.find({ teacher: userId });

        res.status(200).json({ data });
    } catch (error) {
        console.error("Error fetching classes:", error);
        res.status(500).json({ message: "Unable to fetch classes" });
    }
});

router.delete("/courses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCourse = await Class.findByIdAndDelete(id);
      if (!deletedCourse) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json({ message: "Course deleted successfully" });
    } catch (error) {
      console.error("Error deleting course:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


// Update a course by ID
router.put('/courses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(id, updateData, { new: true });
    console.log("callingggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg");
    res.status(200).json({ data: updatedCourse, message: 'Course updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating course' });
  }
});


module.exports = router;