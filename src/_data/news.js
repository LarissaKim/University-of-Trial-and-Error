require('dotenv').config();
const axios = require('axios');

const countries = require('./countries.json');

async function getNews(country) {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=technology&apiKey=${process.env.NEWS_API_KEY}&pageSize=5`
    );

    return {
      country: country,
      articles: response.data.articles,
    };
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = async () => {
  const newsPromises = countries.map(getNews);

  return Promise.all(newsPromises).then((newsObjects) => {
    console.log('newsObjects: ', newsObjects);
    return [].concat.apply([], newsObjects);
  });
};
