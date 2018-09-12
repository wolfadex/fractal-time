const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = () => {
  return {
    mode: isProduction ? 'production' : 'development',
    entry: ['@babel/polyfill', path.join(__dirname, 'src/index.js')],
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].[hash].js',
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
      }),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 2222,
      historyApiFallback: true,
    },
  };
};
