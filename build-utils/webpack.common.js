const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '..', './src/js/index.js'),
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Home',
      filename: 'index.html',
      template: path.resolve(__dirname, '..', './src/index.html'),
    }),
    new HtmlWebpackPlugin({
      title: 'Day 2',
      filename: 'day-two.html',
      template: path.resolve(__dirname, '..', './src/day-two.html'),
    }),
  ],
  resolve: {
    extensions: ['*', '.js'],
  },
  output: {
    path: path.resolve(__dirname, '..', './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    static: path.resolve(__dirname, '..', './dist'),
  },
  devtool: 'eval-source-map',
}
