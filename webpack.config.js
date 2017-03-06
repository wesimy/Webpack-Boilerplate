'use strict';
let webpack = require('webpack');
let path = require('path');
let nodeModulesPath = path.join(__dirname, 'node_modules');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

var enConfig = {
    context: __dirname,
    watch: true,
    entry: {
        en: ['./src/index.en.js'],
     //   ar: ['./src/index.ar.js'],
    },
    output: {
        path: __dirname + "/dist",
        filename: "app.[name].js"
    },
    module: {
        rules: [
           {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }],
                    fallback: "style-loader"
                }),
            },
            {
                test: /\.scss$/,
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
}


var arConfig = {
    context: __dirname,
    watch: true,
    entry: {
       // en: ['./src/index.en.js'],
        ar: ['./src/index.ar.js'],
    },
    output: {
        path: __dirname + "/dist",
        filename: "app.[name].js"
    },
    module: {
        rules: [
           {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }],
                    fallback: "style-loader"
                }),
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "rtlcss-loader"
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
}


module.exports = [enConfig,arConfig];