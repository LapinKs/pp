const path = require('path');

module.exports = {
  entry: './src/plugin.js', 
  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'amd/build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
