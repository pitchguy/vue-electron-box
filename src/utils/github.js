const { Octokit } = require('@octokit/core');

const githubGet = async (url, params) => {
    const octokit = new Octokit({ auth: `91619f342a6b0fec3c7d48418a4cfd14d8353105` });
    const response = await octokit.request(`GET ${url}`, { ...params });

    return response;
};

const githubPost = async (url, params) => {
    const octokit = new Octokit({ auth: `91619f342a6b0fec3c7d48418a4cfd14d8353105` });
    const response = await octokit.request(`POST ${url}`, { ...params });

    return response;
};

export { githubGet, githubPost };
