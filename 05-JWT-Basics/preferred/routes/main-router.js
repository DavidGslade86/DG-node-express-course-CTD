const express =  require('express');
const router = express.Router();

const{login, hello} = require('../controllers/main-controller');

const authMiddleware = require('../middleware/auth');

router.route('/hello').get(authMiddleware, hello);
router.route('/login').post(login);

module.exports = router;