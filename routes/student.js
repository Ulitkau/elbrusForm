const router = require('express').Router();
const Student = require('../model/student');
// const Admin = require('../model/admin');
// const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  res.render('students/start');
});

router.get('/students/new', (req, res) => {
  res.render('students/form');
});

router.post('/students', async (req, res) => {
  let reasons = [req.body.reason1, req.body.reason2, req.body.reason3, req.body.reason4, req.body.reason5, req.body.reason6];
  reasons = reasons.filter(el => el);
  let howknow = [req.body.howKnow1, req.body.howKnow2, req.body.howKnow3, req.body.howKnow4, req.body.howKnow5, req.body.howKnow6,
  req.body.howKnow7, req.body.howKnow8, req.body.howKnow9, req.body.howKnow10];
  howknow = howknow.filter(el => el);
  const newStudent = new Student({
    email: req.body.email,
    github: req.body.github,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    number: req.body.number,
    social: req.body.social,
    closeContact: req.body.closeContact,
    birthday: req.body.birthday,
    city: req.body.city,
    education: req.body.education,
    employmentBefore: req.body.employmentBefore,
    specialConditions: req.body.specialConditions,
    reason: reasons,
    howKnow: howknow,
    format: req.body.format,
    receiptDate: req.body.receiptDate,
  });

  // const hashedPasswords = await bcrypt.hash('12345', 10);


  // const admin = new Admin({
  //   login: 'kechko02@gmail.com',
  //   password: hashedPasswords
  // });
  console.log(newStudent);
  try {
    await newStudent.save();
    await admin.save();
  } catch (error) {
    return res.render('error', {
      message: 'Не удалось добавить запись в базу данных.',
      error: {}
    });
  }

  return res.render('students/end');
})


module.exports = router;
