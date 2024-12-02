const path = require('path');

module.exports = {
  entry: './src/plugin.js', // Входной файл вашего плагина
  output: {
    filename: 'bundle.js', // Имя выходного файла
    path: path.resolve(__dirname, 'amd/build') // Путь к директории для выходного файла
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