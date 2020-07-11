const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const isProd = process.env.NODE_ENV === 'production';
const APP_DIR = path.resolve('./src');

module.exports = {
    mode: isProd ? 'production' : 'development',
    target: 'electron-renderer',
    entry: {
        main: path.resolve(APP_DIR, 'index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: isProd ? '[name].[contenthash].js' : '[name].js'
    },
    module: {        
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebPackPlugin({
            filename: "./index.html",
            template: 'src/index.html'
        })
    ]
};