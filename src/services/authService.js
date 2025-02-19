const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNjMyY2U5YS1kYjAxLTRkOWQtYmI3ZS1hNjJjNzUzZjQwZTAiLCJpYXQiOjE3Mzk5NTkwOTEsImV4cCI6MTczOTk2MjY5MX0.K_jWKFCSR2EuIV9VNBovbvKQQBIfGQPnDHm6ipZ-niw';

const registerUser = async ({ email, password }) => {
    const existingUser = await findUserByEmail(email);
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(email, hashedPassword);

    return { message: 'User registered successfully' };
};

const loginUser = async ({ email, password }) => {
    const user = await findUserByEmail(email);
    if (!user) throw new Error('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid email or password');

    const token = jwt.sign(
        { userId: user.id, email: user.email },  // Still include userId
        JWT_SECRET,
        { expiresIn: '1h' }
    );
    console.log("Received Token Service:", token);
    return { token };
};

module.exports = { registerUser, loginUser };