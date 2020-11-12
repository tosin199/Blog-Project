const express = require('express');
var router = express.Router();
const controller = require('../controllers/subscriptions.controller');

router.get('/', controller.getSub);
router.post('/:id', controller.createSubs);
router.delete('/:id',controller.deleteSubs);


module.exports = router;