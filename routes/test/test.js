const router = require('express').Router();
const Student = require('../../model/student');

// const check = require('../middleware/check');

router.get('/', async (req, res) => {
  const student = await Student.findById('602574a780d732fd74b2b024');
  console.log(student);
  return res.render('admin/profile', { student });
});

module.exports = router;
