// 注：process.env.API_ROOTd的配置可以参考我的另一篇文章，关于生产测试环境配置

import axios from 'axios';
import { Notice } from 'view-design';
import { getStore } from './tools';

// ** 暂时没用
// 统一请求路径前缀
// let base = '/api';
// ** 暂时没用
// 接口环境地址
// let API_ROOT = process.env.API_ROOT;

// 超时设定
axios.defaults.timeout = 15000;
// 跨域访问携带cookie
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        Notice.error({
            title: '请求超时',
        });
        return Promise.resolve(err);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        const data = response.data;
        // 根据返回的code值来做不同的处理(和后端约定)
        switch (data.code) {
            case 210:
                Notice.error({
                    title: '接口请求错误',
                    desc: data.message,
                });
                break;
            // 错误
            case 500:
                Notice.error({
                    title: '请联系管理员或后台同学',
                });
                break;
            default:
                return data;
        }
        return data;
    },
    err => {
        // 返回状态码不为200时候的错误处理
        Notice.error({
            title: '连接错误，请重试',
        });
        return Promise.resolve(err);
    }
);

// get 请求
export const getRequest = (url, params) => {
    let accessToken = getStore('accessToken');
    return axios({
        method: 'get',
        url: `${url}`,
        params: params,
        headers: {
            accessToken: accessToken,
        },
    });
};

// post请求
export const postRequest = (url, params) => {
    let accessToken = getStore('accessToken');
    return axios({
        method: 'post',
        url: `${url}`,
        data: params,
        transformRequest: [
            function(data) {
                let ret = '';
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
                }
                ret = ret.substring(0, ret.length - 1);
                return ret;
            },
        ],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            accessToken: accessToken,
        },
    });
};

export const putRequest = (url, params) => {
    let accessToken = getStore('accessToken');
    return axios({
        method: 'put',
        url: `${url}`,
        data: params,
        transformRequest: [
            function(data) {
                let ret = '';
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
                }
                ret = ret.substring(0, ret.length - 1);
                return ret;
            },
        ],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            accessToken: accessToken,
        },
    });
};

export const deleteRequest = (url, params) => {
    let accessToken = getStore('accessToken');
    return axios({
        method: 'delete',
        url: `${url}`,
        params: params,
        headers: {
            accessToken: accessToken,
        },
    });
};

/**
 * 无需token验证的请求 避免旧token过期导致请求失败
 * @param {*} url
 * @param {*} params
 */
export const getRequestWithNoToken = (url, params) => {
    return axios({
        method: 'get',
        url: `${url}`,
        params: params,
    });
};
