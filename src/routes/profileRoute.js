const express = require('express');
const ProfileController = require('../controllers/profileController');

const router = express.Router();

router.post('/', ProfileController.createProfile);
router.get('/', ProfileController.getAllProfiles);
router.get('/:id', ProfileController.getProfileById);
router.put('/:id', ProfileController.updateProfile);
router.delete('/:id', ProfileController.deleteProfile);

module.exports = router;
