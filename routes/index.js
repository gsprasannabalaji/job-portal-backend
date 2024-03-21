const express = require("express");
const router = express.Router();

const users = require('./user.route');

router.use('/user', users);

module.exports = router;