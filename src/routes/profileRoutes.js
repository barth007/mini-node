const express = require('express');
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, profileController.createProfile);
router.get('/', authMiddleware, profileController.getAllProfiles);
router.get('/:id', authMiddleware, profileController.getProfileById);
router.put('/:id', authMiddleware, profileController.updateProfile);
router.delete('/:id', authMiddleware, profileController.deleteProfile);

module.exports = router;
