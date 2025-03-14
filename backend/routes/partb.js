<<<<<<< HEAD
const express = require('express');
const { updateFeedback, deleteFeedback, updateProctoring, deleteProctoring, updateResearch, deleteResearch, updateWorkshops, deleteWorkshops, updateOutreach, deleteOutreach, updateActivities, deleteActivities, updateResponsibilities, deleteResponsibilities, updateContributions, deleteContributions, updateAwards, deleteAwards } = require('../controllers/partbController');

const router = express.Router();

=======
const express = require("express");
const router = express.Router();
const { updateFeedback, deleteFeedback, updateProctoring, deleteProctoring, updateResearch, deleteResearch, updateWorkshops, deleteWorkshops, updateOutreach, deleteOutreach, updateActivityByIndex, deleteActivityByIndex, updateResponsibilityByIndex, deleteResponsibilityByIndex, updateContributionByIndex, deleteContributionByIndex, updateAwardByIndex, deleteAwardByIndex } = require('../controllers/partbController');
>>>>>>> 25829bfa86117348c33ba0780c7065ad922299a1

//FEEDBACK Controllers
router.put('/feedback/:id', updateFeedback);
router.delete('/feedback/:id', deleteFeedback);

//PROCTORING Controllers
router.put('/proctoring/:id', updateProctoring);
router.delete('/proctoring/:id', deleteProctoring);

//Research Controllers
router.put('/research/:id', updateResearch);
router.delete('/research/:id', deleteResearch);

//workshops Controllers
router.put('/workshops/:id', updateWorkshops);
router.delete('/workshops/:id', deleteWorkshops);

//OUrreach  Controllers
router.put('/outreach/:id', updateOutreach);
router.delete('/outreach/:id', deleteOutreach);

<<<<<<< HEAD
//Activities Controllers
router.put('/activities/:id', updateActivities);
router.delete('/activities/:id', deleteActivities);

//Responsibilities Controllers
router.put('/responsibilities/:id', updateResponsibilities);
router.delete('/responsibilities/:id', deleteResponsibilities);

//Contributions Controllers
router.put('/contributions/:id', updateContributions);
router.delete('/contributions/:id', deleteContributions);

//Awards Controllers
router.put('/awards/:id', updateAwards);
router.delete('/awards/:id', deleteAwards);

=======
//activities Controllers
router.put('/activities/:id/:index', updateActivityByIndex);
router.delete('/activities/:id/:index', deleteActivityByIndex);

//Responsibilities Controllers
router.put('/responsibilities/:id/:index', updateResponsibilityByIndex);
router.delete('/responsibilities/:id/:index', deleteResponsibilityByIndex);

//Contribution Controllers
router.put('/contribution/:id/:index', updateContributionByIndex);
router.delete('/contribution/:id/:index', deleteContributionByIndex);

//Awards Controllers
router.put('/awards/:id/:index', updateAwardByIndex);
router.delete('/awards/:id/:index', deleteAwardByIndex);
>>>>>>> 25829bfa86117348c33ba0780c7065ad922299a1

module.exports = router;