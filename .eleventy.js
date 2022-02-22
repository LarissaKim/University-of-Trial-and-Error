module.exports = function (config) {
  config.addPassthroughCopy('src/js');
  config.addPassthroughCopy('./src/css');

  return {
    pathPrefix: '/jamstastic/',
    dir: {
      input: 'src',
      includes: '_includes',
      output: 'build',
    },
  };
};
