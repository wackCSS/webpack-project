var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [ // All our dev dependancies in package.json
  'faker',
  'lodash',
  'react',
  'react-dom',
  'react-input-range',
  'react-redux',
  'react-router',
  'redux',
  'redux-form',
  'redux-thunk'
];

module.exports = {
  entry: { // By passing in an object we can define multiple entry points
    bundle: './src/index.js', // bundle.js will be the output file (takes name from key)
    vendor: VENDOR_LIBS // pass in array defined above
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[chunkhash].js' // create filename from entry key with cache-busting hash
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'], // css loader reads the files, style-loader build the actual css end file
        test: /\.css$/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'] // look at all entry bundle files and if there are common usages, just include these in vendor output file. Manifest file is created to tell browser if hashed file has actually changed.
      // in package.json i use "npm run clean && webpack" to remove previous dist folder files
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html' // dynamically generates html filein dist containing script links to all output js files
    }),
    new webpack.DefinePlugin({ // DefinePlugin is used to create window. scoped variables
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)      
    })
  ]
};
