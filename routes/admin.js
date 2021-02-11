const router = require('express').Router();
const Admin = require('../model/admin');
const Student = require('../model/student');
const bcrypt = require('bcrypt');
const Student = require('../model/student');

router.get('/', (req, res) => {

  return res.render('admin/login');

});

// ручка обрабатывающая вход
router.post('/', async (req, res) => {
  const { login, password } = req.body;
  const adminUser = await Admin.findOne({ login });

  if (!adminUser || !(await bcrypt.compare(password, adminUser?.password))) {
    return res.redirect('/admin');
  }

  req.session.AdminID = adminUser._id;


  return res.redirect('students');

});

// показывает список студентов
router.get('/students', async (req, res) => {
  const student = await Student.find();
  res.render('admin/adminList', { student });
});

// sortByName сортировка по фамилии
router.get('/sortByName', async (req, res) => {
  const dataLastName = await Student.find().sort('lastName');
  res.render('admin/studentList', { title: 'список студентов', dataLastName });
});

// sortByDate сортировка по дате поступления
router.get('/sortByDate', async (req, res) => {
  const dataReceiptDate = await Student.find().sort('receiptDate');
  res.render('admin/studentList', { title: 'список студентов', dataReceiptDate });
});

// sortByBirthday сортировка по дню рождения
router.get('/sortByBirthday', async (req, res) => {
  const dataBirthday = await Student.find().sort('birthday');
  res.render('admin/studentList', { title: 'список студентов', dataBirthday });
});

// вывод отдельной анкеты студента
router.get('/students/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.render('admin/profileStudent', { student });
});

module.exports = router;
