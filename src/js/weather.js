const positions = [
  {
    country: 'ca',
    coords: {
      latitude: '45.424721',
      longitude: '-75.695000',
    },
  },
  {
    country: 'mx',
    coords: {
      latitude: '19.432608',
      longitude: '-99.133209',
    },
  },
  {
    country: 'pl',
    coords: {
      latitude: '52.237049',
      longitude: '21.017532',
    },
  },
  {
    country: 'kr',
    coords: {
      latitude: '37.532600',
      longitude: '127.024612',
    },
  },
];

function getCapitalCityWeather(position) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${process.env.WEATHER_API_KEY}`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.querySelector('.city').append(data.name);
      document.querySelector('.temp').append(data.main.feels_like);
      document.querySelector('.desc').append(data.main.weather[0].description);
      console.log(data);
    });
}

const coordinates = positions.map(getCapitalCityWeather);
