import { Notice, Spin } from 'view-design';
const { Octokit } = require('@octokit/core');
const myOctokit = Octokit.defaults({
    // auth: "personal-access-token123",
    // baseUrl: 'https://github.acme-inc.com/api/v3',
});
const octokit = new myOctokit();

const wholeSpin = word => {
    Spin.show({
        render: h => {
            return h('div', [
                h('Icon', {
                    class: 'animate-spin-icon-load',
                    props: {
                        type: 'ios-loading',
                        size: 18,
                    },
                }),
                h('div', word || 'Loading'),
            ]);
        },
    });
};

const githubGet = async (url, params) => {
    wholeSpin('接口请求中');
    try {
        const response = await octokit.request(`GET ${url}`, { ...params });
        console.log(response);
        Spin.hide();
        if (response.status == 200) {
            return response;
        } else {
            Notice.error({
                title: '接口请求错误',
                desc: response.message,
            });
            return response;
        }
    } catch (error) {
        Spin.hide();
        console.log('error: ', error);
        Notice.error({
            title: '接口请求错误',
            desc: error,
        });
    }
};

const githubPost = async (url, params) => {
    wholeSpin('接口请求中');
    try {
        const response = await octokit.request(`POST ${url}`, { ...params });

        Spin.hide();
        if (response.status == 200) {
            return response;
        } else {
            Notice.error({
                title: '接口请求错误',
                desc: response.message,
            });
            return response;
        }
    } catch (err) {
        Spin.hide();
        console.log('error: ', error);
        Notice.error({
            title: '接口请求错误',
            desc: error,
        });
    }
};

export { wholeSpin, githubGet, githubPost };
