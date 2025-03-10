const express = require("express");
const router = express.Router();
const { updateFeedback, deleteFeedback, updateProctoring, deleteProctoring, updateResearch, deleteResearch, updateWorkshops, deleteWorkshops, updateOutreach, deleteOutreach } = require('../controllers/partbController');

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


module.exports = router;