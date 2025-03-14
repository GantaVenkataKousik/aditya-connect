const Feedback = require('../models/Feedback');
const Proctoring = require('../models/ProctoringModel');
const Research = require('../models/research');
const Workshops = require('../models/workshops');


//Feedback Controllers
const updateFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const { semester, courseName, numberOfStudents, feedbackPercentage, averagePercentage, selfAssessmentMarks } = req.body;
        const updatedFeedback = await Feedback.findByIdAndUpdate(id, { semester, courseName, numberOfStudents, feedbackPercentage, averagePercentage, selfAssessmentMarks }, { new: true });
        res.status(200).json({
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
        res.status(200).json({
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
        res.status(200).json({
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
        res.status(200).json({
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
        const { title, Description, Category, Date, Venue, OrganizedBy } = req.body;
        const updatedWorkshops = await Workshops.findByIdAndUpdate(id, { title, Description, Category, Date, Venue, OrganizedBy }, { new: true });
        res.status(200).json({
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
        res.status(200).json({
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
const updateActivities = async (req, res) => {
    try {
        const { id } = req.params;
        const { detail, imagePath } = req.body;
        const updatedActivities = await Activities.findByIdAndUpdate(id, { detail, imagePath, updatedAt: Date.now() }, { new: true });
        res.json({
            success: true,
            message: 'Activities updated successfully',
            updatedActivities
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const deleteActivities = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedActivities = await Activities.findByIdAndDelete(id);
        res.json({
            success: true,
            message: 'Activities deleted successfully',
            deletedActivities
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


//Responsibilities Controllers
const updateResponsibilities = async (req, res) => {
    try {
        const { id } = req.params;
        const { Responsibility, assignedBy, imagePath } = req.body;
        const updatedResponsibilities = await Responsibilities.findByIdAndUpdate(id, { Responsibility, assignedBy, imagePath, updatedAt: Date.now() }, { new: true });
        res.json({
            success: true,
            message: 'Responsibilities updated successfully',
            updatedResponsibilities
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}



//Awards Controllers
const updateAwards = async (req, res) => {
    try {
        const { id } = req.params;
        const { award, issuingOrg, imagePath } = req.body;
        const updatedAwards = await Awards.findByIdAndUpdate(id, { award, issuingOrg, imagePath, updatedAt: Date.now() }, { new: true });
        res.json({
            success: true,
            message: 'Awards updated successfully',
            updatedAwards
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const deleteAwards = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAwards = await Awards.findByIdAndDelete(id);
        res.json({
            success: true,
            message: 'Awards deleted successfully',
            deletedAwards
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}



//Contributions Controllers
const updateContributions = async (req, res) => {
    try {
        const { id } = req.params;
        const { contribution, benefit, imagePath } = req.body;
        const updatedContributions = await Contributions.findByIdAndUpdate(id, { contribution, benefit, imagePath, updatedAt: Date.now() }, { new: true });
        res.json({
            success: true,
            message: 'Contributions updated successfully',
            updatedContributions
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const deleteContributions = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedContributions = await Contributions.findByIdAndDelete(id);
        res.json({
            success: true,
            message: 'Contributions deleted successfully',
            deletedContributions
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


const deleteResponsibilities = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedResponsibilities = await Responsibilities.findByIdAndDelete(id);
        res.json({
            success: true,
            message: 'Responsibilities deleted successfully',
            deletedResponsibilities
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}


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
    updateActivities,
    deleteActivities,
    updateResponsibilities,
    deleteResponsibilities,
    updateContributions,
    deleteContributions,
    updateAwards,
    deleteAwards
}   
