const path = require('path');
const {GenerateSW} = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        'webasystcache-sw': './src/webasystcache-sw.js',
        'webasystcache-register': './src/webasystcache-register.js',
        'webasystcache-unregister': './src/webasystcache-unregister.js',
        'webasystcache-del': './src/webasystcache-del.js',
    },
    optimization: {
        minimize: false
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    plugins: [
        // Other plugins...
        //new GenerateSW(),
        new HtmlWebpackPlugin({
            inject: false,
            filename: 'index.html',
            template:  'src/index.html',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            filename: 'index2.html',
            template:  'src/index2.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
};