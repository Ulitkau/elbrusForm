const router = require('express').Router();
const Student = require('../../model/student');

// const check = require('../middleware/check');

router.get('/', async (req, res) => {
  const student = await Student.findOne();
  return res.render('admin/profile', { student });
});

module.exports = router;
