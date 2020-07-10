const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackRules = [];
const webpackPlugins = [];

const sassLoader = {
    test: /\.scss$/,
    use: [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: false,
            },
        },
        "css-loader",
        {
            loader: "postcss-loader",
            options: {
                plugins: () => [autoprefixer()]
            }
        },
        "sass-loader"
    ]
};

const cssLoader = {
    test: /\.css$/,
    use: [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: false,
                plugins: () => [autoprefixer()],
                publicPath: __dirname + 'dist/css',
            }
        },
        "css-loader",
        "postcss-loader",
    ]
};

webpackRules.push(sassLoader);
webpackRules.push(cssLoader);

// MiniCssExtractPlugin
const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css"
});

webpackPlugins.push(miniCssExtractPlugin);

module.exports = {
    entry: {
        'dist/' : './src/js/index.js'
    },
    mode: "development",
    module: {
        rules: webpackRules
    },
    plugins: webpackPlugins,
    output: {
        path: __dirname,
        filename: '[name].js',
    }
}
