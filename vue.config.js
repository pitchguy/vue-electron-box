module.exports = {
    publicPath: '/',
    lintOnSave: false,
    devServer: {
        overlay: {
            warnings: true,
            errors: true,
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
