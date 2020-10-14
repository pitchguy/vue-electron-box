module.exports = {
    publicPath: '/',
    lintOnSave: false,
    devServer: {
        overlay: {
            warnings: true,
            errors: true,
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
};
