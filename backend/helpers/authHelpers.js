const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const hashPassword = asyncHandler( async(password) => {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	return hashedPassword;
});

const passwordVerify = asyncHandler( async(password, hashedPassword) => {
	return await bcrypt.compare(password, hashedPassword);
});

const generateJWT = (userId) => {
	return jwt.sign({userId}, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
}

module.exports = {
	hashPassword,
	generateJWT,
	passwordVerify,
}