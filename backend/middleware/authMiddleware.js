const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler( async(req, res, next) => {
	let token;
	// check if token is provided and valid
	if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1];

			// verify token
			const decode = jwt.verify(token, process.env.JWT_SECRET);

			// get user from database
			const user = await User.findById(decode.userId).select('-password');

			if(!user) {
			res.status(400);
			throw new Error('No user found, not authorized')
			}
			// res.status(200).json({user});
			// set user to request to be available everywhere 
			req.user = user;
			next();
		}
		catch(error) {
			res.status(400);
			throw new Error('Not authorized');
		}

	}
	if(!token) {
		res.status(400);
		throw new Error('No token provided, Not authorized');
	}
});

module.exports = {protect};