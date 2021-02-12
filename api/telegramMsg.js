/* eslint-disable no-undef */
module.exports.sendMsg = (firstName, lastName, number, format) => {
  // //токен и id чата берутся из config.json
  const config = require('../config/config.json');
  let http = require('request');
  // let reqBody = req.body;
  // //каждый элемент обьекта запихиваем в массив
  let fields = [
    '<b>Name</b>: ' + firstName + ' ' + lastName,
    // '<b>Company</b>: ' + reqBody.company,
    // '<b>E-mail</b>: ' + reqBody.email,
    '<b>Phone</b>: ' + number,
    '<b>Format</b>: ' + format,
  ];
  let msg = '';
  //проходимся по массиву и склеиваем все в одну строку
  fields.forEach((field) => {
    msg += field + '\n';
  });
  //кодируем результат в текст, понятный адресной строке
  msg = encodeURI(msg);
  //делаем запрос
  http.post(
    `https://api.telegram.org/bot${config.telegram.token}/sendMessage?chat_id=${config.telegram.chat}&parse_mode=html&text=${msg}`,
    function (error, response) {
      //не забываем обработать ответ
      // console.log('error:', error);
      // console.log('statusCode:', response && response.statusCode);
      // console.log('body:', body);
      let otvet = 'Ваше сообщение успешно отправлено!';
      if (response.statusCode === 200) {
      console.log('Ok telegramm', otvet);
        //res.render('index', { otvet });
        // res.status(200).json({ status: 'ok', message: 'Успешно отправлено!' });
      }
      if (response.statusCode !== 200) {
        // res.status(400).json({ status: 'error', message: 'Произошла ошибка!' });
        console.error(error);
      }
    }
  );
  return;
};
