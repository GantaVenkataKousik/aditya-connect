const Feedback = require('../models/Feedback');
const Proctoring = require('../models/ProctoringModel');
const Research = require('../models/research');
const Workshops = require('../models/workshops');
const User = require('../models/user-model');
const Others = require('../models/others');



//Feedback Controllers
const updateFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const { semester, courseName, numberOfStudents, feedbackPercentage, averagePercentage, selfAssessmentMarks } = req.body;
        const updatedFeedback = await Feedback.findByIdAndUpdate(id, { semester, courseName, numberOfStudents, feedbackPercentage, averagePercentage, selfAssessmentMarks }, { new: true });
        res.json({
            success: true,
            message: 'Feedback updated successfully',
            updatedFeedback
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFeedback = await Feedback.findByIdAndDelete(id);
        res.json({
            success: true,
            message: 'Feedback deleted successfully',
            deletedFeedback
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};





//Proctoring Controllers
const updateProctoring = async (req, res) => {
    try {
        const { id } = req.params;
        const { totalStudents, semesterBranchSec, eligibleStudents, passedStudents, averagePercentage, selfAssessmentMarks } = req.body;
        const updatedProctoring = await Proctoring.findByIdAndUpdate(id, { totalStudents, semesterBranchSec, eligibleStudents, passedStudents, averagePercentage, selfAssessmentMarks }, { new: true });
        res.json({
            success: true,
            message: 'Proctoring updated successfully',
            updatedProctoring
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteProctoring = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProctoring = await Proctoring.findByIdAndDelete(id);
        res.json({
            success: true,
            message: 'Proctoring deleted successfully',
            deletedProctoring
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Research Controllers
const updateResearch = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, publishedDate, userId, sciArticles, wosArticles, proposals, papers } = req.body;
        const updatedResearch = await Research.findByIdAndUpdate(id, { title, description, publishedDate, userId, sciArticles, wosArticles, proposals, papers }, { new: true });
        res.json({
            success: true,
            message: 'Research updated successfully',
            updatedResearch
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteResearch = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedResearch = await Research.findByIdAndDelete(id);
        res.json({
            success: true,
            message: 'Research deleted successfully',
            deletedResearch
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



//Workshops Controllers
const updateWorkshops = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, category, date, startTime, endTime, venue, mode, organizedBy } = req.body;
        const updatedWorkshops = await Workshops.findByIdAndUpdate(id, { title, description, category, date, startTime, endTime, venue, mode, organizedBy }, { new: true });
        res.json({
            success: true,
            message: 'Workshops updated successfully',
            updatedWorkshops
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteWorkshops = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedWorkshops = await Workshops.findByIdAndDelete(id);
        res.json({
            success: true,
            message: 'Workshops deleted successfully',
            deletedWorkshops
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};




//ourreach Controllers
const updateOutreach = async (req, res) => {
    try {
        const { id } = req.params;
        const { Activities } = req.body;
        const updatedOutreach = await Others.findByIdAndUpdate(id, { Activities }, { new: true });
        res.json({
            success: true,
            message: 'Outreach updated successfully',
            updatedOutreach
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}



const deleteOutreach = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await Others.findById(id);
        record.Activities = [];
        await record.save();
        res.json({
            success: true,
            message: 'Outreach deleted successfully',
            record
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


//Activities Controllers
const updateActivityByIndex = async (req, res) => {
    try {
        const { id, index } = req.params; // Assuming index is passed as a URL parameter
        const { activityDetails, UploadFiles } = req.body;

        // Find the document by ID
        const record = await Others.findById(id);
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        // Check if the index is valid
        if (index < 0 || index >= record.Activities.length) {
            return res.status(400).json({ message: 'Invalid activity index' });
        }

        // Update the specific activity
        record.Activities[index].activityDetails = activityDetails;
        if (UploadFiles) {
            record.Activities[index].UploadFiles = UploadFiles;
        }

        // Save the updated document
        await record.save();

        res.json({
            success: true,
            message: 'Activity updated successfully',
            updatedActivity: record.Activities[index]
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteActivityByIndex = async (req, res) => {
    try {
        const { id, index } = req.params; // Assuming index is passed as a URL parameter

        // Find the document by ID
        const record = await Others.findById(id);
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        // Check if the index is valid
        if (index < 0 || index >= record.Activities.length) {
            return res.status(400).json({ message: 'Invalid activity index' });
        }

        // Remove the specific activity
        record.Activities.splice(index, 1);

        // Save the updated document
        await record.save();

        res.json({
            success: true,
            message: 'Activity deleted successfully',
            updatedActivities: record.Activities
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Responsibilities Controllers
const updateResponsibilityByIndex = async (req, res) => {
    try {
        const { id, index } = req.params;
        const { Responsibility, assignedBy, UploadFiles } = req.body;

        const record = await Others.findById(id);
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        if (index < 0 || index >= record.Responsibilities.length) {
            return res.status(400).json({ message: 'Invalid responsibility index' });
        }

        record.Responsibilities[index].Responsibility = Responsibility;
        record.Responsibilities[index].assignedBy = assignedBy;
        if (UploadFiles) {
            record.Responsibilities[index].UploadFiles = UploadFiles;
        }

        await record.save();

        res.json({
            success: true,
            message: 'Responsibility updated successfully',
            updatedResponsibility: record.Responsibilities[index]
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const updateContributionByIndex = async (req, res) => {
    try {
        const { id, index } = req.params;
        const { contributionDetails, Benefit, UploadFiles } = req.body;

        const record = await Others.findById(id);
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        if (index < 0 || index >= record.Contribution.length) {
            return res.status(400).json({ message: 'Invalid contribution index' });
        }

        record.Contribution[index].contributionDetails = contributionDetails;
        record.Contribution[index].Benefit = Benefit;
        if (UploadFiles) {
            record.Contribution[index].UploadFiles = UploadFiles;
        }

        await record.save();

        res.json({
            success: true,
            message: 'Contribution updated successfully',
            updatedContribution: record.Contribution[index]
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateAwardByIndex = async (req, res) => {
    try {
        const { id, index } = req.params;
        const { Award, IssuingOrg, UploadFiles } = req.body;

        const record = await Others.findById(id);
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        if (index < 0 || index >= record.Awards.length) {
            return res.status(400).json({ message: 'Invalid award index' });
        }

        record.Awards[index].Award = Award;
        record.Awards[index].IssuingOrg = IssuingOrg;
        if (UploadFiles) {
            record.Awards[index].UploadFiles = UploadFiles;
        }

        await record.save();

        res.json({
            success: true,
            message: 'Award updated successfully',
            updatedAward: record.Awards[index]
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteAwardByIndex = async (req, res) => {
    try {
        const { id, index } = req.params;

        const record = await Others.findById(id);
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        if (index < 0 || index >= record.Awards.length) {
            return res.status(400).json({ message: 'Invalid award index' });
        }

        record.Awards.splice(index, 1);

        await record.save();

        res.json({
            success: true,
            message: 'Award deleted successfully',
            updatedAwards: record.Awards
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const deleteContributionByIndex = async (req, res) => {
    try {
        const { id, index } = req.params;
        const record = await Others.findById(id);
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        if (index < 0 || index >= record.Contribution.length) {
            return res.status(400).json({ message: 'Invalid contribution index' });
        }

        record.Contribution.splice(index, 1);

        await record.save();

        res.json({
            success: true,
            message: 'Contribution deleted successfully',
            updatedContributions: record.Contribution
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteResponsibilityByIndex = async (req, res) => {
    try {
        const { id, index } = req.params;
        const record = await Others.findById(id);
        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        if (index < 0 || index >= record.Responsibilities.length) {
            return res.status(400).json({ message: 'Invalid responsibility index' });
        }

        record.Responsibilities.splice(index, 1);

        await record.save();

        res.json({
            success: true,
            message: 'Responsibility deleted successfully',
            updatedResponsibilities: record.Responsibilities
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = {
    updateFeedback,
    deleteFeedback,
    updateProctoring,
    deleteProctoring,
    updateResearch,
    deleteResearch,
    updateWorkshops,
    deleteWorkshops,
    updateOutreach,
    deleteOutreach,
    updateActivityByIndex,
    deleteActivityByIndex,
    updateResponsibilityByIndex,
    deleteResponsibilityByIndex,
    updateContributionByIndex,
    deleteContributionByIndex,
    updateAwardByIndex,
    deleteAwardByIndex
};   
