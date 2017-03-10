var webpackCfg = require('./webpack.config');

module.exports = function(config) {
  config.set({
    basePath: '',
    browsers: [ 'Firefox' ],
    files: [
      'test/loadtests.js'
    ],
    port: 30480,
    captureTimeout: 15000,
    frameworks: [
      'mocha',
      'chai',
      'sinon',
      'sinon-chai',
      'intl-shim'
    ],
    client: {
      mocha: {}
    },
    singleRun: true,
    reporters: [ 'mocha', 'coverage' ],
    preprocessors: {
      'test/loadtests.js': [ 'webpack', 'sourcemap' ]
    },
    webpack: webpackCfg,
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html' },
        { type: 'text' },
        { type: 'lcov' }
      ]
    }
  });
};
