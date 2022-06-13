const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/commands', requiresAuth() , require('./command'));
router.use('/users', requiresAuth(), require('./users'));

module.exports = router;
   