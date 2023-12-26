const express = require('express');
const router = express.Router();
const { auth, logon, logoff } = require('../controllers/authorization')

router.get('/test', auth, (req, res) => {
    res.status(200).json({ success: true, msg:`Welcome ${req.user}` })
});

router.post('/logon', logon, (req, res)=> {
});

router.delete('/logoff', logoff, (req, res) => {
});

module.exports = router;