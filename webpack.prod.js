require('dotenv').config();

const webpack = require('webpack');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');

const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');

const common = require('./webpack.common');

const plugins = [
  new webpack.ProgressPlugin(),
  new WorkboxWebpackPlugin.GenerateSW({
    swDest: './service-worker.js',
  }),
  new ImageminWebpackPlugin({
    plugins: [
      ImageminMozjpeg({
        quality: 50,
        progressive: true,
      }),
    ],
  }),
];

if (process.env.MODE !== 'production') {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins,
});
