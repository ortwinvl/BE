/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/server.ts',
    target: 'node',
    externals: [ nodeExternals() ],
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.(json)$/,
          exclude: /node_modules/,
        },
      ],      
    },
    resolve: {
      fallback: {
        "path": require.resolve("path-browserify"),
        "stream": require.resolve("stream-browserify"),
        "util": require.resolve("util/"),
        "assert": require.resolve("assert/"),
        "zlib": require.resolve("browserify-zlib"),
        "constants": require.resolve("constants-browserify"),
        "https": require.resolve("https-browserify"),
        "querystring": require.resolve("querystring-es3"),
        "buffer": false,
        "crypto": false,
        "http": false,
        "url": false,
        "fs": false,
        "os": false,
        "async_hooks": false,
        "net": false,
      },
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: "src/static", to: "static"},
        ],
      }),
    ],
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      static: path.join(__dirname, "dist"),
      compress: true,
      port: 4000,
    },
  };