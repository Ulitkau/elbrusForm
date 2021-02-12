const formId = 'telegramForm'
const form = document.getElementById(formId)
//функция для захвата данных из тегов формы и синтеза JSON-обьекта 
function toJSONString(form) {
  var obj = {}
  var elements = form.querySelectorAll('input, textarea')
  for (var i = 0; i < elements.length; ++i) {
    var element = elements[i]
    var name = element.name
    var value = element.value
    if (name) {
      obj[ name ] = value
    }
  }
  return JSON.stringify(obj)
}
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault()
    //получаем данные из формы
    const json = toJSONString(form)
    //создаем соединение
    const formReq = new XMLHttpRequest()
    formReq.open('POST', '/telegram', true)
    ///////////////////////////////////
    /////////////SweetAlert//////////
    ///////////////////////////////////
    //обрабатываем ответ сервера
    formReq.onload = function(oEvent) {
      if (formReq.status === 200) {
        swal({
          title: 'Успешно отправлено!',
          icon: 'success',
          timer: 2000
        })
        // document.querySelector('.success').style.display = 'block'
        // document.querySelector('.contact').style.opacity = '0'
      }
      if (formReq.status !== 200) {
        swal({
          title: 'Произошла ошибка!',
          icon: 'error',
          timer: 2000
        })
        // document.querySelector('.error').style.display = 'block'
        // document.querySelector('.contact').style.opacity = '1'
      }
    }
    ////////////////////////////
    ////////////////////////////
    formReq.setRequestHeader('Content-Type', 'application/json')
    //отправляем
    formReq.send(json)
  })
}
