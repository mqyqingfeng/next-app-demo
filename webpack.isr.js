const path = require('path') 

module.exports = {
  mode:'development',
  target: 'node',
  entry: './isr.js',       
  output: {                     
    filename: 'isr.bundle.js',    
    path: path.resolve(__dirname, 'build')    
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
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
}