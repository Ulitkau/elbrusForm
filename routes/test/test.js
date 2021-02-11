const router = require('express').Router();
const Student = require('../../model/student');

// const check = require('../middleware/check');

router.get('/', async (req, res) => {
  let student = await Student.findById('6025a0a99b74c6334a3de129').lean();
  console.log(student);
  const editReceiptDate = new Date(student.receiptDate).toISOString().substring(0, 10)
  const editbirthday = new Date(student.birthday).toISOString().substring(0, 10);
  return res.render('admin/profile', { student, editReceiptDate, editbirthday });
});

module.exports = router;
