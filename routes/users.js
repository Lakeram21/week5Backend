const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.get('/', userController.getAll);

router.get('/:id', userController.getUser);

router.post('/', userController.createUser);

// router.put('/:id', userController.updateCommand);

// router.delete('/:id', userController.deleteCommand);

module.exports = router;
