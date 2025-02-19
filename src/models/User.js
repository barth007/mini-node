const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (email, hashedPassword) => {
    return prisma.user.create({
        data: { email, password: hashedPassword }
    });
};

const findUserByEmail = async (email) => {
    return prisma.user.findUnique({
        where: { email }
    });
};

module.exports = { createUser, findUserByEmail };