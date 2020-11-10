const express = require('express');
var router = express.Router();
const controller = require('../controllers/subscriptions.controller');

router.get('/', controller.getSub);
router.post('/', controller.createSubs);
router.delete('/',controller.deleteSubs);