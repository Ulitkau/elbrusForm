/* eslint-disable prefer-const */
/* eslint-disable no-cond-assign */
/* eslint-disable no-array-constructor */
const buscet = document.getElementById('exampleModalLabel');
const counter = document.getElementById('counter');
const { id } = buscet.dataset;
const tbody = document.querySelector('#targetbody');
const savebuscet = document.getElementById('savebuscet');

const reg2 = /(?:good:\s*{\s*_id:\s+)(\w*)(?:,\w*\s*title:\s*')(.*)(?:',\w*\s*description:\s*')(.*)(?:',\w*\s*price:\s*)(\d*)(?:,\s*art:\s*')(\d*)(?:',\s*imgPath:\s*')(.*)(?:',\s*__v:\s+0\s*},)/gm;
let ext = buscet.dataset.buscet;
let list = {};
let listArr = [];
let match23 = reg2.exec(String(ext));
do {
  let x = match23[1];
  list[x] = list[x] + 1 || 1;
  if (list[x] === 1) {
    listArr.push(
      new Array(
        match23[1],
        match23[2],
        match23[3],
        match23[4],
        match23[5],
        match23[6]
      )
    );
  }
} while ((match23 = reg2.exec(ext)) !== null);
listArr.forEach((elem) => elem.push(list[elem[0]]));

const count = listArr.reduce((sum, each) => sum + each[6], 0);
counter.innerText = count;

function render() {
  if (tbody) {
    tbody.innerHTML = '';
    for (let i = 0; i < listArr.length; i += 1) {
      const element = document.createElement('tr');
      element.setAttribute('data-i', `${i}`);
      element.innerHTML = `
    <td>${listArr[i][1]}</td>
    <td>${listArr[i][4]}</td>
    <td>${listArr[i][3]}</td>
    <td>${listArr[i][6]}</td>
    <td><button type="button" class="plus btn btn-outline-success"> + 1 </button></td>
    <td><button type="button" class="minus btn btn-outline-info"> - 1 </button></td>
    <td><button type="button" class="delete btn btn-outline-danger"> DEL </button></td>
     `;
      tbody.appendChild(element);
    }
  }
}

render();

tbody.addEventListener('click', (event) => {
  if (!event.target.classList.contains('delete')) {
    return;
  }
  const { i } = event.target.parentElement.parentElement.dataset;
  listArr.splice(i, 1);
  render();
});

tbody.addEventListener('click', (event2) => {
  if (!event2.target.classList.contains('plus')) {
    return;
  }
  const { i } = event2.target.parentElement.parentElement.dataset;
  listArr[i][6] += 1;
  render();
});

tbody.addEventListener('click', (event3) => {
  if (!event3.target.classList.contains('minus')) {
    return;
  }
  const { i } = event3.target.parentElement.parentElement.dataset;
  listArr[i][6] -= 1;
  if (listArr[i][6] === 0) {
    listArr.splice(i, 1);
  }
  render();
});

if (savebuscet) {
  savebuscet.addEventListener('click', async () => {
    const body = listArr
      .map((element) => {
        const itemB = Array(element[6]).fill({
          good: element[0],
          buyer: id,
        });
        return itemB;
      })
      .flat();
    const custom_id = id;

    const response = await fetch('/shop/cards', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ body, custom_id }),
    });

    if (response.status !== 200) {
      const errorMessageDiv = document.querySelector('#errormessage');
      errorMessageDiv.innerText = `Сорня, нишмогла я .${response.status}`;
      return;
    }
    // const { result } = await response.json();
    // console.log(result);
    window.location = 'http://localhost:3000/shop/cards';
  });
}
