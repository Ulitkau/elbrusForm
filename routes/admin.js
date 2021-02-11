const router = require('express').Router();
const Admin = require('../model/admin');
const Student = require('../model/student');
const bcrypt = require('bcrypt');

const check = require('../middleware/check')

router.get('/', (req, res) => {
  return res.render('admin/login');
});

// ручка обрабатывающая вход
router.post('/', async (req, res) => {
  const { login, password } = req.body;
  const adminUser = await Admin.findOne({ login });
  console.log(adminUser);

  if (!adminUser || !(await bcrypt.compare(password, adminUser?.password))) {
    return res.redirect('/admin');
  }

  const students = await Student.find();


  req.session.AdminID = adminUser._id;

  return res.render('admin/adminList', { title: 'список студентов', students });
});

router.get('/filterbyhowknow', async (req, res) => {
  const filterParams = req.body;
  // const filterDB = await Student.find({ reason: 'Всегда мечтал(а) стать разработчиком' });
  const filterDB = await Student.find().sort('lastName');
  console.log(filterDB);
  return res.render('admin/studentList', { title: 'список студентов', list: filterDB })
})



// sortByName сортировка по фамилии
router.get('/sortByName/:direction', check, async (req, res) => {
  const dataLastName = await Student.find().sort('lastName');
  res.render('admin/studentList', { title: 'список студентов', students: dataLastName });
});


// sortByDate сортировка по дате поступления
router.get('/sortByDate/:direction', check, async (req, res) => {
  const dataReceiptDate = await Student.find().sort('receiptDate');
  res.render('admin/studentList', { title: 'список студентов', students: dataReceiptDate });
});

// sortByBirthday сортировка по дню рождения
router.get('/sortByBirthday/:direction', check, async (req, res) => {
  const dataBirthday = await Student.find().sort('birthday');
  res.render('admin/studentList', { title: 'список студентов', students: dataBirthday });
});

// вывод отдельной анкеты студента
router.get('/students/:id', check, async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.render('admin/profileStudent', { student });
});

router.get('/filterByHowKnow', check, async (req, res) => {
  const filterParams = req.body;
  // const filterDB = await Student.find({ $and: [{ reason: 'Всегда мечтал(а) стать разработчиком' }, { reason: 'В IT много платят' }] });
  // const filterDB = await Student.find().sort('lastName');
  console.log(filterDB);
  return res.render('admin/studentList', { title: 'список студентов', students: filterDB })
});

router.get('/filterByReason', check, async (req, res) => {
  const filterParams = req.body;
  // const filterDB = await Student.find({ $and: [{ reason: 'Всегда мечтал(а) стать разработчиком' }, { reason: 'В IT много платят' }] });
  // const filterDB = await Student.find().sort('lastName');
  console.log(filterDB);
  return res.render('admin/studentList', { title: 'список студентов', students: filterDB })
});

module.exports = router;
