const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
    //mode: 'development',
    //mode: 'production',
    entry: ['@babel/polyfill','./src/index.js'],
    module: {
        rules: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    },
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: __dirname + '/dist'
    },
    plugins: [
        new HTMLPlugin ({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    resolve: {
        extensions: ['.js']
    }
}