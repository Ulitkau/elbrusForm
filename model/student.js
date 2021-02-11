const { Schema, model, pluralize } = require('mongoose');

pluralize(null);

const studentSchema = new Schema({
  email: {
    // почта
    type: String,
    required: false,
  },
  github: {
    // ссылка на гитхаб
    type: String,
    required: false,
  },
  firstName: {
    // имя
    type: String,
    required: false,
  },
  lastName: {
    // фамилия
    type: String,
    required: false,
  },
  number: {
    // номер телефона
    type: String,
    required: false,
  },
  social: {
    // ссылка на соцсети
    type: String,
    required: false,
  },
  closeContact: String, // контакт близкого человека
  birthday: {
    // день рождения
    type: Date,
    required: false,
  },
  city: {
    // город
    type: String,
    required: false,
  },
  education: {
    // уровень образования
    type: String,
    required: false,
  },
  employmentBefore: {
    // чем занимались до поступления
    type: String,
    required: false,
  },
  specialConditions: String, // специальные условия по здоровью
  reason: [
    {
      // почему поступили
      type: String,
      required: false,
    },
  ],
  howKnow: [
    {
      // как узнали о буткемпе
      type: String,
      required: false,
    },
  ],
  format: {
    // формат обучения
    type: String,
    required: false,
  },
  receiptDate: {
    // дата поступления
    type: Date,
    required: false,
  },
});

module.exports = model('students', studentSchema);
