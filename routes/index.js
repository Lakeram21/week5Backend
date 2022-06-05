const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/commands', require('./command'));
router.use('/users', require('./users'));

module.exports = router;
