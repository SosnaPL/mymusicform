const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");
const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV ? "development" : "production",
  entry: {
    index: "./src/index.tsx"
  },
  output: {
    filename: "[name]-[hash:8].bundle.js",
    chunkFilename: "[name]-[hash:8].chunk.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      },
      {
        test: /\.(s*)css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader"
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      inject: true,
      favicon: 'src/logo/favicon.ico'
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime/])
  ],
  optimization: {
    usedExports: true,
    runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    }
  },
  devServer: {
    historyApiFallback: true,
  },
};

if (process.env.NODE_ENV === "development") {
  const dev = {
    devtool: "source-map",
    output: {
      filename: "[name].bundle.js",
      chunkFilename: "[name].chunk.js",
      path: path.resolve(__dirname, "dist")
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      historyApiFallback: true,
      hot: true,
      compress: true,
      port: 8080,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization"
      }
    }
  };
  module.exports = { ...module.exports, ...dev };
}
