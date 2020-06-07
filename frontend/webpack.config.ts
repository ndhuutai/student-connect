import path from 'path';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  title: 'student-connect',
  template: './public/index.html',
  filename: 'index.html',
});

declare const process: {
  env: {
    NODE_ENV: 'development' | 'production' | 'none';
  };
};

const config: webpack.Configuration = {
  entry: './src/index.tsx',
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
  },

  plugins: [
    HTMLWebpackPluginConfig,
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
                '@babel/preset-react',
              ],
            },
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-modules-typescript-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              esModule: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    publicPath: '/',
    contentBase: path.join(__dirname, 'public'),
    proxy: {
      '*': 'http://[::1]:3000',
    },
  },
};
export default config;
