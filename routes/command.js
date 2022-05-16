const express = require('express');
const router = express.Router();

const commandController = require('../controllers/command');

router.get('/', commandController.getAll);

router.get('/:id', commandController.getSpecificSoftwareType);

router.post('/', commandController.createCommand);

router.put('/:id', commandController.updateCommand);

router.delete('/:id', commandController.deleteCommand);

module.exports = router;
