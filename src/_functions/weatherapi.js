const axios = require('axios');

/** AWS Lambda function */
module.exports.handler = async (event) => {
  const { lat, lon } = event.queryStringParameters;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;

  const response = await axios.get(url);

  return {
    statusCode: 200,
    body: JSON.stringify(response.data, null, 2),
  };
};
