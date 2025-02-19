const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ProfileService {
    async createProfile(data) {
        return prisma.profile.create({ data });
    }

    async getAllProfiles() {
        return prisma.profile.findMany();
    }

    async getProfileById(id) {
        return prisma.profile.findUnique({ where: { id } });
    }

    async updateProfile(id, data) {
        return prisma.profile.update({ where: { id }, data });
    }

    async deleteProfile(id) {
        return prisma.profile.delete({ where: { id } });
    }
}

module.exports = new ProfileService();
