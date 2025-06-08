const express = require('express');
const { getprompt } = require('../controller/ai.controller');
const router = express.Router();

router.post("/getreview",getprompt)

module.exports = router;