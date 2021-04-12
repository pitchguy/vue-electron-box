import { getRequest as get, postRequest as post } from './http';

let api1 = '/api';
let api2 = '/content';

export const getRank = (id, params) => {
    return get(`${api1}/ranking/${id}`, params);
};
