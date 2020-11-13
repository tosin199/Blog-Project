const express = require('express');
const router = express.Router();
const categoryCntrl = require ('../controllers/category.controllers');

router.get ('/', categoryCntrl.getCategory);
router.post ('/create', categoryCntrl.createCategory);
router.put ('/:id', categoryCntrl.updateCategory);
router.delete ('/:id', categoryCntrl.deleteCategory);

module.exports = router;
