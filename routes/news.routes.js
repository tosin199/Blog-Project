const express = require('express');
const router = express.Router();
const newsCntrl = require ('../controllers/news.controllers');

router.get ('/', newsCntrl.getNews);
router.post ('/create', newsCntrl.createNews);
router.put ('/:id', newsCntrl.updateNews);
router.delete ('/:id', newsCntrl.deleteNews);

module.exports = router;
