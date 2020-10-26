const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    publicPath: '/',
    lintOnSave: false,
    devServer: {
        overlay: {
            warnings: false,
            error: false,
        },
        proxy: {
            '/api': {
                target: 'http://api.zhuishushenqi.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
            },
            '/content': {
                target: 'http://chapter2.zhuishushenqi.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/content': '',
                },
            },
        },
    },
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    javascriptEnabled: true,
                },
            },
        },
    },
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            preload: 'src/preload.js',
        },
    },
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin([
                {
                    from: './static', // 新增可以被index.html访问的静态文件目录,支持多个
                    to: './static',
                },
            ]),
        ],
    },
};
