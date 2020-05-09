fetch('http://api.openweathermap.org/data/2.5/forecast?q=tashkent&APPID=928f8bc51bba58c08043ccb3d4c0261d')
  .then(function (resp) {
    return resp.json()
  })
  .then(function (data) {
    console.log(data)
    document.querySelector('.city-name').textContent = data.city.name;
    document.querySelector('.temp-city').innerHTML = Math.round(data.list[0].main.temp - 273) + '&deg';
  }).catch(function () {

  })

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}