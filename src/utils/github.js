import { Notice, Spin } from 'view-design';
const { Octokit } = require('@octokit/core');

const githubGet = async (url, params) => {
    Spin.show();
    const octokit = new Octokit();
    const response = await octokit.request(`GET ${url}`, { ...params });

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
};

const githubPost = async (url, params) => {
    Spin.show();
    const octokit = new Octokit({ auth: `91619f342a6b0fec3c7d48418a4cfd14d8353105` });
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
};

export { githubGet, githubPost };
