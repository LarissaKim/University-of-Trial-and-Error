const axios = require('axios');
require('dotenv').config();

const countries = ['ca', 'mx', 'pl', 'kr'];
const categories = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];

const country = countries[Math.floor(Math.random() * Math.floor(countries.length))];
const category = categories[Math.floor(Math.random() * Math.floor(categories.length))];

module.exports = async () => {
  try {
    // TODO: Get random country, category on refresh
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.NEWS_API_KEY}&pageSize=5`
    );
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};
