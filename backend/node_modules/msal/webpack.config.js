/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const package = require("./package");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const PATHS = {
    entryPoint: path.resolve(__dirname, "src/index.ts"),
    bundles: path.resolve(__dirname, "dist"),
};

module.exports = {
    mode: "production",
    entry: {
        "msal": [PATHS.entryPoint],
        "msal.min": [PATHS.entryPoint]
    },
    output: {
        path: PATHS.bundles,
        filename: "[name].js",
        libraryTarget: "umd",
        library: "Msal",
        umdNamedDefine: true
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    devtool: "source-map",
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new webpack.BannerPlugin({
            banner: `/*! ${package.name} v${package.version} ${new Date().toISOString().split("T")[0]} */\n'use strict';`,
            raw: true
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            include: /\.min\.js$/,
            extractComments: false
        })]
    },
    module: {
        rules: [{
            test: /\.(ts|tsx|js)?$/,
            use: {
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                }
            }
        }]
    }
};
