const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Note = require('../model/Note');

// ROUTE: Get all the notes
router.get('/fetchAllNotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json({ notes }); // Response format updated for consistency
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ROUTE: Add a new note using a POST request, login required
router.post('/addnotes',  [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }),
], fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        });

        const savedNote = await note.save();

        res.json({ note: savedNote }); // Response format updated for consistency
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ROUTE: Update a note
router.put('/updatenote/:id', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const noteId = req.params.id;
        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newNote = {};

        if (title) {
            newNote.title = title;
        }

        if (description) {
            newNote.description = description;
        }

        if (tag) {
            newNote.tag = tag;
        }

        const note = await Note.findById(noteId);

        if (!note) {
            return res.status(404).send("Note not found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        const updatedNote = await Note.findByIdAndUpdate(noteId, { $set: newNote }, { new: true });

        res.json({ note: updatedNote });
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ROUTE: Delete a note
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        const noteId = req.params.id;
        const note = await Note.findById(noteId);

        if (!note) {
            return res.status(404).send("Note not found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        const deletedNote = await Note.findByIdAndDelete(noteId);

        res.json({ note: deletedNote });
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
