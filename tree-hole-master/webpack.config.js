module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: __dirname + "/"
  },
  module: {
    loaders: [
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   exclude: /node_modules/,
      //   query: {
      //     presets: ['react', 'es2015']
      //   }
      // },
      {
        test:/\.jsx?$/,
        loaders:['babel-loader']
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      }
    ]
  }
}
