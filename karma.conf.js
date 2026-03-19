module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@babel/preset-env'],
    files: [
      'node_modules/@babel/polyfill/dist/polyfill.js',
      'tests/**/*.test.js'
    ],
    preprocessors: {
      'tests/**/*.test.js': ['webpack']
    },
    webpack: {
      // Your webpack configuration
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          }
        ]
      }
    },
    browsers: ['Chrome'],
    singleRun: true,
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    concurrency: Infinity
  });
};