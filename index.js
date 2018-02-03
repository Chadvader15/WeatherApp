let weatherUrl = 'https://fcc-weather-api.glitch.me/api/current?';
let lat, lon, completeUrl, cTemp;
let fShow = false;

$(document).ready(() => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      completeUrl = `${weatherUrl}lat=${lat}&lon=${lon}`;
      axios.get(completeUrl)
          .then(({ data }) => {
            let weather = data.weather[0].main;
            let temp = cTemp = data.main.temp;
            let city = data.name;
            let country = data.sys.country;
            $('#icon').html(chooseIcon(weather));
            $('#temp').html(Math.floor(temp) + '&deg; C');
            $('#city').text(city + ', ' + country);

          });
    });
  } else {
    console.log('Geolocation is not available');
  }
  $('#temp-button').on('click', () => {
    changeTemp(cTemp);
  });
});

function chooseIcon(weatherIcon) {
  weatherIcon = weatherIcon.toLowerCase();
  switch (weatherIcon) {
      case 'drizzle':
        return '<i class="wi wi-day-sprinkel"></i>';
      case 'clouds':
        return '<i class="wi wi-day-cloudy"></i>';
      case 'thunderstorm':
        return '<i class="wi wi-day-thunderstorm"></i>';
      case 'rain':
        return '<i class="wi wi-day-rain"></i>';
      case 'snow':
        return '<i class="wi wi-day-snow"></i>';
      case 'clear':
        return '<i class="wi wi-day-sunny"></i>';
      default:
        return '<i class="wi wi-na"></i>';
  }
}

function changeTemp(temperature) {
  let newTemp;
  if(! fShow) {
    newTemp = temperature * 1.8 + 32;
  } else {
    newTemp = cTemp;
  }
  fShow = !fShow;
  let tempCF = fShow ? 'F' : 'C';
  $('#temp').html(Math.floor(newTemp) + '&deg; ' + tempCF);
}
