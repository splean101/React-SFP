const path = require("path");

module.exports = {
   entry: "./src/index.js",
   output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js"
   },
   module: {
      rules: [ {
         test: /\.(js|jsx)$/,
         exclude: [ /node_modules/ ],
         use: {
            loader: "babel-loader",
            options: {
               presets: [ "@babel/preset-react" ]
            }
         }
      } ]
   },
   mode: "development",
   devServer: {
      open: true,
      historyApiFallback: true
   }
};
