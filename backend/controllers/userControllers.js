const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const {
	hashPassword, 
	generateJWT, 
	passwordVerify 
} = require('../helpers/authHelpers');
const bcrypt = require('bcryptjs');

// @desc		Register new user
// @route 		POST /api/users/register
// @access 		Public
const register = asyncHandler( async(req, res) => {
	if(!req.body.name || !req.body.email || !req.body.password) {
		res.status(400);
		throw new Error('Please provide full user credentials');
	}

	const {email, name, password} = req.body;

	// check email if the user already exists in the database
	const user = await User.findOne({email: email});
	if(user) {
		res.status(400);
		throw new Error('User already exists');
	}

	// register the user
	const newUser = await User.create({
		name,
		email,
		password: await hashPassword(password),
	});

	if(!newUser) {
		res.status(500);
		throw new Error('Failed to register user');
	}

	res.status(201).json({
		id: newUser._id,
		name: newUser.name,
		email: newUser.email,
		token: generateJWT(newUser._id),
	});
});

// @desc		Login user
// @route 		POST /api/users/login
// @access 		Public
const login = asyncHandler( async(req, res) => {
	try {
		
		const {email, password} = req.body;

		if(!email || !password) {
			res.status(400);
			throw new Error('Please provide your credentials');
		}

		// check if the user login credentials are correct and login user
		const user = await User.findOne({email});

		if(user && (await bcrypt.compare(password, user.password))) {
			res.status(200).json({
				id: user._id,
				name: user.name,
				email: user.email,
				token: generateJWT(user._id),
			});
		}else {
			res.status(400);
			throw new Error('Invalid Credentials, or user does not exist');
		}


	} catch (error) {
		res.status(500);
		throw new Error(`Something went wrong, ${error}`);
	}
});

// @desc		Get user
// @route 		GET /api/users/me
// @access 		Private
const getMe = asyncHandler( async(req, res) => {
	res.status(200).json(req.user);
});

module.exports = {
	register,
	login,
	getMe,
};