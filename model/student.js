const { Schema, model, pluralize } = require('mongoose');

pluralize(null);

const studentSchema = new Schema({
  email: {                        // почта
    type: String,
    required: true
  },
  github: {                       // ссылка на гитхаб
    type: String,
    required: true
  },
  firstName: {                    // имя
    type: String,
    required: true
  },
  lastName: {                     // фамилия
    type: String,
    required: true
  },
  number: {                       // номер телефона
    type: String,
    required: true
  },
  social: {                       // ссылка на соцсети
    type: String,
    required: true
  },
  closeContact: String,           // контакт близкого человека
  birthday: {                     // день рождения
    type: Date,
    required: true
  },
  city: {                         // город
    type: String,
    required: true
  },
  education: {                    // уровень образования
    type: String,
    required: true
  },
  employmentBefore: {             // чем занимались до поступления
    type: String,
    required: true
  },
  specialConditions: String,      // специальные условия по здоровью
  reason: {                       // почему поступили
    type: String,
    required: true
  },
  howKnow: {                      // как узнали о буткемпе
    type: String,
    required: true
  },
  format: {                       // формат обучения
    type: String,
    required: true
  },
  receiptDate: {                  // дата поступления
    type: Date,
    required: true
  },
},
);

module.exports = model('students', studentSchema);


