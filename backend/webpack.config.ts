import path from 'path';
import webpack from 'webpack';

declare const process: {
  env: {
    NODE_ENV: 'development' | 'production' | 'none';
  };
};

const config: webpack.Configuration = {
  entry: './src/index.ts',
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-typescript'],
            },
          },
        ],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
};
export default config;
