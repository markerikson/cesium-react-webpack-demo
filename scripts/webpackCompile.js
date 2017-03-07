const webpack = require("webpack");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require("chalk");

function compile (name, webpackConfig, options = {}) {
    if(!webpackConfig.plugins) {
        webpackConfig.plugins = [];
    }

    const {showProgress = true} = options;
    const {logStats = true} = options;

    if(showProgress) {
        webpackConfig.plugins.push(new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds) (:msg)',
            clear: false
        }));
    }

    const compiler = webpack(webpackConfig)


    return new Promise((resolve, reject) => {
        console.log(`Compiling: ${name}`);

        compiler.run((err, stats) => {
            if (err) return reject(err);

            if (stats.hasErrors()) {
                return reject(new Error(stats.toString({
                    errorDetails: true,
                    warnings: true
                })));
            }


            if(logStats) {
                stats.compilation.children = stats.compilation.children.filter(child => {
                    if(child.name.includes("extract-text")) {
                        const assetNames = Object.keys(child.assets);
                        return assetNames.length > 0;
                    }

                    return true;
                });
                const statsString = stats.toString({
                    chunks: false, // Makes the build much quieter
                    colors: true,
                    warnings: true
                });
                console.log(statsString);
            }

            resolve({ stats});
        });
    })
}





module.exports = compile;