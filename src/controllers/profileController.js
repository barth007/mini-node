const ProfileService = require('../services/profileService');

class ProfileController {
    async createProfile(req, res) {
        try {
            const profile = await ProfileService.createProfile(req.body);
            res.status(201).json(profile);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllProfiles(req, res) {
        const profiles = await ProfileService.getAllProfiles();
        res.json(profiles);
    }

    async getProfileById(req, res) {
        const profile = await ProfileService.getProfileById(req.params.id);
        profile ? res.json(profile) : res.status(404).json({ error: "Profile not found" });
    }

    async updateProfile(req, res) {
        try {
            const updatedProfile = await ProfileService.updateProfile(req.params.id, req.body);
            res.json(updatedProfile);
        } catch (error) {
            res.status(404).json({ error: "Profile not found" });
        }
    }

    async deleteProfile(req, res) {
        try {
            await ProfileService.deleteProfile(req.params.id);
            res.json({ message: "Profile deleted successfully" });
        } catch (error) {
            res.status(404).json({ error: "Profile not found" });
        }
    }
}

module.exports = new ProfileController();
