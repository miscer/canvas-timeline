module.exports = {
  entry: './src/index.js',
  output: {
    path: './build',
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'file-loader'
      }
    ]
  }
};
