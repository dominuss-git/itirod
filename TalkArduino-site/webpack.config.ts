import path from "path";

module.exports = {
  entry: "./src",
  output: {
    path: path.resolve(__dirname, "dist"), 
    filename: "bundle.js", // string
  },
  module: {
    rules: [{
        test: /\.scss$/,
          use: [{
            loader: "style-loader"
          }, {
            loader: "css-loader" 
          }, {
            loader: "sass-loader"
          }]
    }]
  }
}
