const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('start');
});
router.get('/students/new', (req, res, next) => {
  res.render('students/form');
});

module.exports = router;
