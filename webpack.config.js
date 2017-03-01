'use strict';
let webpack = require('webpack');
let path = require('path');
let nodeModulesPath = path.join(__dirname, 'node_modules');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports =  {
    context: __dirname,
    watch: true,
    entry: {
        en: [    
            './src/index.en.js',
        ],
        ar: [
            './src/index.ar.js',
        ]
        ,
    },
    output: {
        path: __dirname + "/dist",
        filename: "app.[name].js"
    },
    module: {
        rules: [ 
            {
                enforce: 'pre',
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: "import-glob-loader",
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "jshint-loader"
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                }, {
                        loader: "sass-loader"
                }],
                    fallback: "style-loader"
                }),
        }]
    },
    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    plugins: [
        new ExtractTextPlugin("app.[name].css"),
    ]
};





