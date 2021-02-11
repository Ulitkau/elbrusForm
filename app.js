require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const { connect } = require('mongoose');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

// пути к ручкам
const studentRouter = require('./routes/student');
const adminRouter = require('./routes/admin')

const app = express();
const port = process.env.PORT ?? 3000;

// подключаем hbs
app.set('view engine', 'hbs');
app.set('views', path.join(process.env.PWD, 'views'));

// подключаем статику
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));

// подключаем сессию
const sessionConfig = {
  store: new FileStore(),
  key: 'sid',
  secret: 'elbrus_form',
  resave: true,
  saveUninitialized: false,
  cookie: { expires: 1800000 },
};

app.use(session(sessionConfig));

// прописываем маршруты
app.use('/', studentRouter);
app.use('/admin', adminRouter);

// запуск сервера
app.listen(port, () => {
  console.log(`Сервер успешно запущен на порту ${port}.`);

  connect(`mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_CONNECTION_ADDRESS}/elbrusFormDb?${process.env.DB_CONNECTION_OPTIONS}`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }, () => {
    console.log('Подлючение к базе данных успешно.');
  });
});


