let time = document.querySelector('.time');


function measureTime() {
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  time.innerHTML = (`${hour<10 ? (hour = '0' + hour) : hour}:${minute<10 ? (minute = '0' + minute) : minute}:${second<10 ? (second = '0' + second) : second}`)
}
setInterval(measureTime, 1000);
measureTime()

// *******************************

let month_day = document.querySelector('.monthDay');
let month = document.querySelector('.day');
let weekDay = document.querySelector('.week-day');

let date = new Date();
let monthDay = date.getMonth();
let day = date.getDay();
let ss = date.getDate();

console.log(day)


let days = ['Вс', 'Пд', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
let months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
console.log()

month_day.innerHTML = ss;
month.innerHTML = months[monthDay];
weekDay.innerHTML = days[day];