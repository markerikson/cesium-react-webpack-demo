"use strict";

const path = require("path");
const webpack = require("webpack");

const paths = require("./paths");
const env = require("./env");

const outputPath = path.join(paths.app, "distdll");

const webpackConfig = {
    entry : {
        cesiumDll : ["cesium/Source/Cesium.js"],
    },
    devtool : "#source-map",
    output : {
        path : outputPath,
        filename : "[name].js",
        library : "[name]_[hash]",
        sourcePrefix: "",
    },
    plugins : [
        new webpack.DllPlugin({
            path : path.join(outputPath, "[name]-manifest.json"),
            name : "[name]_[hash]",
            context : paths.cesiumSourceFolder,
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify("production")
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })

    ],
    module : {
        unknownContextCritical : false,
        loaders : [
            { test : /\.css$/, loader: "style!css" },
            {
                test : /\.(png|gif|jpg|jpeg)$/,
                loader : "file-loader",
            },
        ],
    },
};


module.exports = webpackConfig;