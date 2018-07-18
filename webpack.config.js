var path = require('path')

module.exports = {
  entry: './www/app/main.js',
  output: {
    filename: "bundle.js",
    // path: path.resolve(__dirname,"www/dist")
    publicPath: "xuni"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: [
          path.resolve(__dirname, "node_modules")
        ],
        include: [
          path.resolve(__dirname, "www/app")
        ],
        options: {
          presets: ["env", "react"],
          plugins: ["transform-object-rest-spread", "transform-runtime"]
        }
      },
      {
        test: /\.less$/,
        loader: ["style-loader", "css-loader", "less-loader"],
        include: [
          path.resolve(__dirname, "www/app")
        ],
        exclude: [
          path.resolve(__dirname, "node_modules")
        ]
      }
    ]
  },
  devServer: {
    proxy: {
      "/": {
        target: 'http://127.0.0.1:3000',
        // host: 'http://192.168.0.240',
        port: 8080,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
}
