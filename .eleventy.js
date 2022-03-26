module.exports = function (config) {
  config.addPassthroughCopy('src/js');
  config.addPassthroughCopy('src/css');

  return {
    pathPrefix: '/University-of-Trial-and-Error/',
    dir: {
      input: 'src',
      includes: '_includes',
      output: 'build',
    },
  };
};
