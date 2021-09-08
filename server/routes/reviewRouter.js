const express = require('express');
const { create, getAll } = require('../controllers/reviewController');

const { validateToken } = require('../middlewares/auth');

const router = express.Router();

router.route('/').get(getAll).post(validateToken, create);

module.exports = router;