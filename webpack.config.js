/* eslint-disable no-undef */
const path = require(`path`);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, `./source`),
  build: path.resolve(__dirname, `./build`),
  assets: `assets/`,
}

module.exports = {
  entry: `${PATHS.src}/js/main.js`,
  output: {
    filename: `${PATHS.assets}js/main.js`,
    path: `${PATHS.build}`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
          options: {
            presets: [`@babel/preset-env`],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: `style-loader`,
          },
          MiniCssExtractPlugin.loader,
          {
            loader: `css-loader`,
            options: {
              url: false,
            },
          },
          {
            loader: `postcss-loader`,
            options: {
              config: {
                path: `${__dirname}/postcss.config.js`,
              },
            },
          },
          {
            loader: `sass-loader`,
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: `${PATHS.assets}img`,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              optipng: {
                enabled: true,
              },
              pngquant: {
                strip: true,
                quality: [0.65, 0.90],
                speed: 5,
              },
              mozjpeg: {
                quality: 70,
                progressive: true,
              },
              webp: {
                quality: 70,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: `./index.html`,
      template: `${PATHS.src}/index.html`,
      inject: false,
    }),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/style.css`,
    }),
    new CopyPlugin([
      { from: `${PATHS.src}/fonts`, to: `${PATHS.assets}fonts` },
      { from :`${PATHS.src}/music`, to: `${PATHS.assets}music`},
    ]),
  ],
  devServer: {
    contentBase: `build/`,
    port: 8081,
    open: true,
  },
  devtool: `source-map`,
}
