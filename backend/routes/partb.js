const express = require('express');
const { updateFeedback, deleteFeedback, updateProctoring, deleteProctoring, updateResearch, deleteResearch, updateWorkshops, deleteWorkshops, updateOutreach, deleteOutreach, updateActivities, deleteActivities, updateResponsibilities, deleteResponsibilities, updateContributions, deleteContributions, updateAwards, deleteAwards } = require('../controllers/partbController');

const router = express.Router();


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


module.exports = router;