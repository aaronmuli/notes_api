const express = require('express');
const {protect} = require('../middleware/authMiddleware');
const router = express.Router();
const { 
	addNote, 
	deleteNote, 
	updateNote, 
	getNotes 
} = require('../controllers/noteControllers');


router.route('/api/notes').get(protect, getNotes).post(protect, addNote);
router.route('/api/notes/:id').delete(protect, deleteNote).put(protect, updateNote);

module.exports = router;	