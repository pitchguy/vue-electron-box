export const getStore = name => {
    return localStorage.getItem(name) || '';
};
