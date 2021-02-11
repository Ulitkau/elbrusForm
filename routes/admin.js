const router = require('express').Router();
const Admin = require('../model/admin');
const bcrypt = require('bcrypt');
const Student = require('../model/student')

router.get('/', (req, res) => {
  return res.render('admin/login', { title: 'Вход' });
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

// router.get('/:id')

router.get('/filterbyhowknow', async (req, res) => {
  const filterParams = req.body;
  // const filterDB = await Student.find({ reason: 'Всегда мечтал(а) стать разработчиком' });
  const filterDB = await Student.find().sort('lastName');
  console.log(filterDB);
  return res.render('admin/studentList', { title: 'список студентов', list: filterDB })
})



module.exports = router;
