const path = require('path')

module.exports = {
  mode: 'development',
  entry: './client.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname)
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', ["@babel/preset-react", { "runtime": "automatic" }]]
          }
        }
      }
    ]
  }
}