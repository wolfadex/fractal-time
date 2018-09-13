const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = () => {
  return {
    mode: isProduction ? 'production' : 'development',
    entry: ['@babel/polyfill', path.join(__dirname, 'src/index.js')],
    output: {
      path: path.join(__dirname, 'public'),
      filename: isProduction ? '[name].[hash].js' : '[name].js',
    },
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /.js$/,
          use: 'babel-loader',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Fractal Timeline',
        template: path.join(__dirname, 'src/index.html'),
      }),
    ],
  };
};
