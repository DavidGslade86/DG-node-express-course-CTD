const express = require('express');
const router = express.Router();
const { searchById, getPeople, addPerson, editEntryById, deleteEntryById, auth } = require('../controllers/people')

router.get('/', getPeople, (req, res) => {
});

router.get('/:id', searchById, (req, res) => {
});

router.put('/:id', editEntryById, (req, res) => {
});

router.delete('/:id', deleteEntryById, (req, res) => {
});

router.post('/', addPerson, (req, res)=> {
});


module.exports = router;