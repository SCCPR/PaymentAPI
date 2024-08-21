const express = require('express');
const router = express.Router();
const agencyController = require('../controllers/agencyController');

router.get('/agencies', agencyController.getAllAgencies);
router.post('/agencies', agencyController.createAgency);
router.get('/agencies/:id', agencyController.getAgencyById);
router.put('/agencies/:id', agencyController.updateAgency);
router.delete('/agencies/:id', agencyController.deleteAgency);

module.exports = router;
