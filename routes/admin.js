const router = require('express').Router();
const Admin = require('../model/admin');
const Student = require('../model/student');
const bcrypt = require('bcrypt');

const check = require('../middleware/check');
const { findByIdAndDelete } = require('../model/admin');

router.get('/', (req, res) => {
  if (req.session?.AdminID) {
    return res.redirect('admin/students')
  } else {
    return res.render('admin/login');
  }
});

// ручка обрабатывающая вход
router.post('/students', async (req, res) => {
  const { login, password } = req.body;
  const adminUser = await Admin.findOne({ login });
  if (!adminUser || !(await bcrypt.compare(password, adminUser?.password))) {
    return res.redirect('/admin');
  }

  req.session.AdminID = adminUser._id;
  return res.redirect('/admin/students');
});

router.get('/students', check, async (req, res) => {
  let students = await Student.find().lean();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  students = students.map((el) => {
    return {
      ...el,
      receiptDate: new Date(el.receiptDate).toLocaleString('ru-RU', options),
      birthday: new Date(el.birthday).toLocaleString('ru-RU', options),
    };
  });
  return res.render('admin/studentList', { students });
});

// return res.render('admin/login', { title: 'Вход' })



// sortByName сортировка по фамилии
router.get('/students/sortByName/:direction', check, async (req, res) => {
  let dataLastName;
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  if (req.params.direction === 'upper') {
    dataLastName = await Student.find().sort('lastName').lean();
  }
  else {
    dataLastName = await Student.find().sort([['lastName', -1]]).lean();
  }
  dataLastName = dataLastName.map((el) => {
    return {
      ...el,
      receiptDate: new Date(el.receiptDate).toLocaleString('ru-RU', options),
      birthday: new Date(el.birthday).toLocaleString('ru-RU', options),
    };
  });
  res.render('admin/studentList', { students: dataLastName });
});


// sortByDate сортировка по дате поступления
router.get('/students/sortByDate/:direction', check, async (req, res) => {
  let dataReceiptDate;
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  if (req.params.direction === 'upper') {
    dataReceiptDate = await Student.find().sort('receiptDate').lean();
  }
  else {
    dataReceiptDate = await Student.find().sort([['receiptDate', -1]]).lean();
  }
  dataReceiptDate = dataReceiptDate.map((el) => {
    return {
      ...el,
      receiptDate: new Date(el.receiptDate).toLocaleString('ru-RU', options),
      birthday: new Date(el.birthday).toLocaleString('ru-RU', options),
    };
  });
  res.render('admin/studentList', { students: dataReceiptDate });
});

// sortByBirthday сортировка по дню рождения
router.get('/students/sortByBirthday/:direction', check, async (req, res) => {
  let dataBirthday;
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  if (req.params.direction === 'upper') {
    dataBirthday = await Student.find().sort('birthday').lean();
  }
  else {
    dataBirthday = await Student.find().sort([['birthday', -1]]).lean();
  }
  dataBirthday = dataBirthday.map((el) => {
    return {
      ...el,
      receiptDate: new Date(el.receiptDate).toLocaleString('ru-RU', options),
      birthday: new Date(el.birthday).toLocaleString('ru-RU', options),
    };
  });
  res.render('admin/studentList', { students: dataBirthday });
});

// вывод отдельной анкеты студента
router.get('/students/select/:id', check, async (req, res) => {
  let student = await Student.findById(req.params.id);
  editReceiptDate = new Date(student.receiptDate).toISOString().substring(0, 10);
  editBirthday = new Date(student.birthday).toISOString().substring(0, 10);
  res.render('admin/profile', { student, editReceiptDate, editBirthday });
});


router.post('/students/filterByKnow', check, async (req, res) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  let filterDB;
  let know = req.body.howKnow;
  if (know === 'Все' || know === undefined) {
    filterDB = await Student.find().lean();
  }
  else {
    filterDB = await Student.find({ howKnow: know }).lean();
  }
  filterDB = filterDB.map((el) => {
    return {
      ...el,
      receiptDate: new Date(el.receiptDate).toLocaleString('ru-RU', options),
      birthday: new Date(el.birthday).toLocaleString('ru-RU', options),
    };
  });
  return res.render('admin/studentList', { students: filterDB })
});

router.post('/students/filterByFormat', check, async (req, res) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  let filterDB;
  let format = req.body.format;
  if (format === 'Все' || format === undefined) {
    filterDB = await Student.find().lean();
  }
  else {
    filterDB = await Student.find({ format }).lean();
  }
  filterDB = filterDB.map((el) => {
    return {
      ...el,
      receiptDate: new Date(el.receiptDate).toLocaleString('ru-RU', options),
      birthday: new Date(el.birthday).toLocaleString('ru-RU', options),
    };
  });
  return res.render('admin/studentList', { students: filterDB })
});

// удаление анкеты студента
router.get('/students/select/:id/delete', async (req, res) => {
  console.log(req.params.id);
  try {
    await Student.findByIdAndDelete(req.params.id);
  } catch (err) {
    return res.status(500).end();
  }

  return res.redirect('/admin/students');
});

// выход из учётки администратора, удаление куки
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('sid');
  res.redirect('/admin');
});

module.exports = router;
