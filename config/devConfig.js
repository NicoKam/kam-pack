'use strict';

const webpack = require('webpack');
const HappyPack = require('happypack');
const HtmlPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const AutoDllPlugin = require('autodll-webpack-plugin-webpack-4');
const path = require('path');
const os = require('os');
const _ = require('lodash');
const { srcPath, buildPath, nodeModulesPath } = require('./paths');
const { devCustomConfig, devOtherConfig } = require('./customConfig');
const { autoDllConfig = {} } = devOtherConfig;

const devDefaultConfig = {
  context: srcPath,
  devtool: 'module-eval-source-map',
  entry: [
    require.resolve('react-hot-loader/patch'),
    require.resolve('react-dev-utils/webpackHotDevClient'),
    './index',
  ],
  mode: 'development',
  externals: {},
  output: {
    path: buildPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/',
    crossOriginLoading: 'anonymous',
  },
  resolve: {
    modules: ['node_modules', nodeModulesPath, srcPath],
    extensions: ['.js', '.json', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin(),
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
    //           require.resolve('react-hot-loader/babel'),
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
    //       loader: 'style-loader',
    //     },
    //     {
    //       loader: 'css-loader',
    //       options: {
    //         modules: false,
    //       },
    //     },
    //     {
    //       loader: 'postcss-loader',
    //       query: require('../postcss.config.js'),
    //     },
    //   ],
    // }),
    // new HappyPack({
    //   id: 'sass',
    //   threads: os.cpus().length,
    //   loaders: [
    //     {
    //       loader: 'style-loader',
    //     },
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
    //       query: require('../postcss.config.js'),
    //     },
    //     {
    //       loader: 'sass-loader',
    //       options: {
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
    //       loader: 'style-loader',
    //     },
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
    //       query: require('../postcss.config.js'),
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
    new AutoDllPlugin(autoDllConfig),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
            },
          },
          {
            loader: 'postcss-loader',
            query: require('../postcss.config.js'),
          },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader',
          },
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
          {
            loader: 'style-loader',
          },
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
            loader: 'babel-loader?cacheDirectory',
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
        loader: 'file-loader',
      },
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&minetype=application/octet-stream',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&minetype=image/svg+xml',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['url-loader?limit=8192'],
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
  devServer: {
    host: '127.0.0.1',
    port: '8000',
    proxy: {},
    compress: true,
    contentBase: buildPath,
    clientLogLevel: 'none',
    disableHostCheck: true,
    hot: true,
    historyApiFallback: true,
    publicPath: '/',
    stats: {
      chunks: false,
      colors: true,
    },
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  },
};

module.exports = _.merge({}, devDefaultConfig, devCustomConfig);
