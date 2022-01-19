module.exports = function (config) {
  config.addPassthroughCopy('src/js');

  return {
    pathPrefix: '/jamstastic/',
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
