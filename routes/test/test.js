const router = require('express').Router();
const Student = require('../../model/student');

// const check = require('../middleware/check');

router.get('/', async (req, res) => {
  const student = await Student.findById('60254a341a8137c56dd62dc1');
  return res.render('admin/profile', { student });
});

module.exports = router;
