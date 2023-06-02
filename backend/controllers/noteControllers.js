const Note = require('../models/noteModel');
const asyncHandler = require('express-async-handler');

// @desc        Get notes
// @route       GET /api/notes
// @access      Private
const getNotes = asyncHandler (async (req, res) => {
        // get notes for the user
        const notes = await Note.find({user: req.user._id});
        res.status(200).json(notes);
});

// @desc        Add note
// @route       POST /api/notes
// @access      Private
const addNote = asyncHandler(async (req, res) => {
        if(!req.body.note) {
            res.status(400);
            throw new Error('Please add a note value');
        }
    
        const note = await Note.create({
            user: req.user._id,
            text: req.body.note,
        });
    
        res.status(201).json(note);
});

// @desc        Update note
// @route       PUT /api/notes/:id
// @access      Private
const updateNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if(String(note.user) !== String(req.user._id)) {
        res.status(400);
        throw new Error('Not authorized');
    }
    
    if(!note) {
        res.status(400);
        throw new Error('The note is not found');
    }

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(201).json(updatedNote);
});

// @desc        Delete note
// @route       DELETE /api/note/:id
// @access      Private
const deleteNote = asyncHandler (async (req, res) => {
    const note = await Note.findById(req.params.id);

    if(!note) {
        res.status(400);
        throw new Error('No note found');
    }

    if(String(note.user) !== String(req.user._id)) {
        res.status(400);
        throw new Error('Not authorized');
    }

    await Note.findByIdAndDelete(req.params.id);

    res.status(200).json({id: `${req.params.id}`});

});

module.exports = {
    getNotes,
    addNote,
    updateNote,
    deleteNote
};