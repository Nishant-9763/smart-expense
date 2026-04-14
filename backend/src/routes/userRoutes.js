const express = require('express');
const router = express.Router();
const { createUserHandler, getAllUsersHandler } = require('../controllers/userController');

router.get('/', getAllUsersHandler);
router.post('/', createUserHandler);

module.exports = router;