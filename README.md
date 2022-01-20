# JAMstack experiments

Website experiments using JavaScript, API, and Markdown.

**NOTE**: NewsAPI Developer (free) tier has a rate limit of **100 requests per day**
**NOTE**: Local dev environment needs to be configured to serve requests over HTTPS in order to use Geolocation.getCurrentPosition()

## Roadmap

- [x] Configure GitHub workflow to host on GitHub Pages with Eleventy
- [ ] NewsAPI: [Cache response](https://youtu.be/A_l0qrPUJds?t=9733) instead of hitting API every time
- ~~[ ] Get random country, category from NewsAPI on page refresh~~
- [x] Create news page for each country
- [ ] OpenWeather API: Deploy AWS Lambda function to fetch request with API key
- [ ] \(Optional): To access user's location, configure local dev environment to serve requests over HTTPS
- [ ] Redirect 404 to an error page
- [ ] Expand project
  - [ ] Experiment with other content types/APIs
  - [ ] Further exploration of [JAMstack ecosystem](https://medium.com/memory-leak/the-jamstack-its-pretty-sweet-e0834e4e6bb7)
  - [ ] Shift to serverless?

### References

- freeCodeCamp.org's [JAMstack Course](https://www.youtube.com/watch?v=A_l0qrPUJds)
- [JAMstack course starting repo](https://github.com/philhawksworth/fcc-1-simply-static)
  - [Info for local environment HTTPS config](https://github.com/philhawksworth/fcc-6-client-side-api)
- Code Cadette's [Free blog with eleventy and github pages](https://www.youtube.com/watch?v=x4rRO12swrw)
