const router = require('express').Router();
const Admin = require('../model/admin');
const Student = require('../model/student');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
  let students = await Student.find().lean();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  students = students.map((el) => {
    return {
      ...el,
      receiptDate: new Date(el.receiptDate).toLocaleString('ru-RU', options),
      birthday: new Date(el.receiptDate).toLocaleString('ru-RU', options),
    };
  });
  return res.render('admin/adminList', { students });
  // return res.render('admin/login', { title: 'Вход' });
});

// ручка обрабатывающая вход
router.post('/', async (req, res) => {
  const { login, password } = req.body;
  const adminUser = await Admin.findOne({ login });

  if (!adminUser || !(await bcrypt.compare(password, adminUser?.password))) {
    return res.redirect('/admin');
  }

  req.session.AdminID = adminUser._id;

  return res.render('admin/adminList', { title: 'список студентов' });
});

module.exports = router;
