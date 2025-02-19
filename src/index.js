require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// Create Profile
app.post('/profiles', async (req, res) => {
    try {
        const { firstName, lastName, email, age } = req.body;
        const profile = await prisma.profile.create({
            data: { firstName, lastName, email, age }
        });
        res.json(profile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get All Profiles
app.get('/profiles', async (req, res) => {
    const profiles = await prisma.profile.findMany();
    res.json(profiles);
});

// Get a Profile by ID
app.get('/profiles/:id', async (req, res) => {
    const { id } = req.params;
    const profile = await prisma.profile.findUnique({ where: { id } });
    profile ? res.json(profile) : res.status(404).json({ error: "Profile not found" });
});

// Update a Profile
app.put('/profiles/:id', async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, age } = req.body;
    try {
        const updatedProfile = await prisma.profile.update({
            where: { id },
            data: { firstName, lastName, email, age }
        });
        res.json(updatedProfile);
    } catch (error) {
        res.status(404).json({ error: "Profile not found" });
    }
});

// Delete a Profile
app.delete('/profiles/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.profile.delete({ where: { id } });
        res.json({ message: "Profile deleted successfully" });
    } catch (error) {
        res.status(404).json({ error: "Profile not found" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
