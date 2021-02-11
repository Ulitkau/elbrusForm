const router = require('express').Router();
const Student = require('../model/student');

router.get('/', (req, res) => {
  res.render('students/start');
});

router.get('/students/new', (req, res) => {
  res.render('students/form');
});

router.post('/students', async (req, res) => {
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
    reason: req.body.reason,
    howKnow: req.body.howKnow,
    format: req.body.format,
    receiptDate: req.body.receiptDate,
  });

  try {
    await newStudent.save();
  } catch (error) {
    res.render('error', {
      message: 'Не удалось добавить запись в базу данных.',
      error: {}
    });
  }

  return res.render('students/end');
})


module.exports = router;
