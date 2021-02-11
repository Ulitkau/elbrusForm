const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('students/start');
});
router.get('/students/new', (req, res, next) => {
  res.render('students/form');
});

router.get('/students/end', (req, res, next) => {
  res.render('students/end');
});
module.exports = router;
