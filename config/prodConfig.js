'use strict';

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
// const HappyPack = require('happypack');
// const os = require('os');
const path = require('path');
const _ = require('lodash');
const { srcPath, buildPath, nodeModulesPath } = require('./paths');
const { prodCustomConfig } = require('./customConfig');

const prodDefaultConfig = {
  bail: true,
  context: srcPath,
  devtool: false,
  // devtool: 'cheap-module-eval-source-map',
  // devtool: 'module-source-map',
  entry: './index',
  externals: {},
  output: {
    path: buildPath,
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
    publicPath: '/',
    crossOriginLoading: 'anonymous',
  },
  resolve: {
    modules: ['node_modules', nodeModulesPath, srcPath],
    extensions: ['.js', '.json', '.jsx'],
  },
  plugins: [
    new MiniCssExtractPlugin({filename:'[name].[hash:8].css'}),
    new UglifyJSPlugin({
      parallel: true,
      sourceMap: true,
    }),
    // new HappyPack({
    //   id: 'js',
    //   threads: os.cpus().length,
    //   loaders: [
    //     {
    //       loader: 'babel-loader',
    //       options: {
    //         babelrc: false,
    //         presets: [
    //           [require.resolve('babel-preset-env'), { modules: false }],
    //           require.resolve('babel-preset-react'),
    //           require.resolve('babel-preset-stage-0'),
    //         ],
    //         plugins: [
    //           require.resolve('babel-plugin-transform-decorators-legacy'),
    //           [
    //             require.resolve('babel-plugin-transform-runtime'),
    //             {
    //               helpers: false,
    //               polyfill: false,
    //               regenerator: true,
    //               moduleName: path.dirname(
    //                 require.resolve('babel-runtime/package')
    //               ),
    //             },
    //           ],
    //         ],
    //       },
    //     },
    //   ],
    // }),
    // new HappyPack({
    //   id: 'css',
    //   threads: os.cpus().length,
    //   loaders: [
    //     {
    //       loader: 'css-loader',
    //     },
    //     {
    //       loader: 'postcss-loader',
    //       query: {
    //         config: path.resolve(__dirname, '..', 'postcss.config.js'),
    //       },
    //     },
    //   ],
    // }),
    // new HappyPack({
    //   id: 'sass',
    //   threads: os.cpus().length,
    //   loaders: [
    //     {
    //       loader: 'css-loader',
    //       query: {
    //         modules: false,
    //         importLoaders: 1,
    //         // minimize: true, // There is not obvious change on file size after minimize.
    //         localIdentName: '[name]__[local]___[hash:base64:5]',
    //       },
    //     },
    //     {
    //       loader: 'postcss-loader',
    //       query: {
    //         config: path.resolve(__dirname, '..', 'postcss.config.js'),
    //       },
    //     },
    //     {
    //       loader: 'sass-loader',
    //       query: {
    //         sourceMap: true,
    //       },
    //     },
    //   ],
    // }),
    // new HappyPack({
    //   id: 'less',
    //   threads: os.cpus().length,
    //   loaders: [
    //     {
    //       loader: 'css-loader',
    //       options: {
    //         modules: false,
    //         importLoaders: 1,
    //         localIdentName: '[name]__[local]___[hash:base64:5]',
    //       },
    //     },
    //     {
    //       loader: 'postcss-loader',
    //       query: {
    //         config: path.resolve(__dirname, '..', 'postcss.config.js'),
    //       },
    //     },
    //     {
    //       loader: 'less-loader',
    //       options: {
    //         sourceMap: true,
    //       },
    //     },
    //   ],
    // }),
    new HtmlPlugin({ template: './index.html' }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // {
          //   loader: 'style-loader',
          // },
          {
            loader: 'css-loader',
            options: {
              modules: false,
            },
          },
          {
            loader: 'postcss-loader',
            query: require('../postcss.config.js'),
            // query: {
            //   config: require('../postcss.config.js'),
            //   // config: path.resolve(__dirname, '..', 'postcss.config.js'),
            // },
          },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          // {
          //   loader: 'style-loader',
          // },
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            query: require('../postcss.config.js'),
            // query: {
            //   config: require('../postcss.config.js'),
            //   // config: path.resolve(__dirname, '..', 'postcss.config.js'),
            // },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [srcPath],
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          // {
          //   loader: 'style-loader',
          // },
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            query: require('../postcss.config.js'),
            // query: {
            //   // config: path.resolve(__dirname, '..', 'postcss.config.js'),
            // },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jsx|js)?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                [require.resolve('babel-preset-env'), { modules: false }],
                require.resolve('babel-preset-react'),
                require.resolve('babel-preset-stage-0'),
              ],
              plugins: [
                require.resolve('react-hot-loader/babel'),
                require.resolve('babel-plugin-transform-decorators-legacy'),
                [
                  require.resolve('babel-plugin-transform-runtime'),
                  {
                    helpers: false,
                    polyfill: false,
                    regenerator: true,
                    moduleName: path.dirname(
                      require.resolve('babel-runtime/package')
                    ),
                  },
                ],
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader',
      },
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&minetype=application/font-woff',
      },
      {
        test: /\.(ttf|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&minetype=application/octet-stream',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&minetype=image/svg+xml',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['url-loader?limit=8192&name=[path][name].[hash:12].[ext]'],
        exclude: /node_modules/,
      },
      {
        test: /\.swf$/,
        use: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, '..', 'node_modules')],
  },
};

module.exports = _.merge({}, prodDefaultConfig, prodCustomConfig);
