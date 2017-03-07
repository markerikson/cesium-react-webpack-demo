const path = require("path");
const webpack = require("webpack");

const compile = require("./webpackCompile");


const cesiumConfig = require('../config/webpack.cesium.dll.config.js');

compile("cesium", cesiumConfig)
    .then( ({stats}) => {
    });