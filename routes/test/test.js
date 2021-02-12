const router = require('express').Router();
const Student = require('../../model/student');

// const check = require('../middleware/check');

router.get('/', async (req, res) => {
  let student = await Student.findById('602574a780d732fd74b2b024').lean();
  console.log(student);
  const editReceiptDate = new Date(student.receiptDate)
    .toISOString()
    .substring(0, 10);
  const editbirthday = new Date(student.birthday)
    .toISOString()
    .substring(0, 10);
  return res.render('admin/profile', {
    student,
    editReceiptDate,
    editbirthday,
  });
});

module.exports = router;
