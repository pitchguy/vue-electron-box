import fs from 'fs';
import path from 'path';

// 判断文件是否存在
const fileExist = filePath => {
    return fs.existsSync(filePath);
};

//打开文件目录
const openDirSync = path => {
    fs.opendirSync(path);
};

// 仅删除目录下的文件
const deleteJsonFile = filePath => {
    if (fileExist(filePath)) {
        fs.unlinkSync(filePath);
    }
};

// 删除目录下所有文件
const deleteDirectoryFile = () => {
    if (fileExist(filePath)) {
        fs.readdirSync(filePath).forEach(file => {
            const curPath = `${filePath}/${file}`;
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteDirectoryFile(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(filePath);
    }
};
const ensureDirectoryExistence = dirPath => {
    console.log(dirPath);
    try {
        if (!fs.existsSync(dirPath)) {
            const parentDir = path.dirname(dirPath);
            ensureDirectoryExistence(parentDir);
            fs.mkdirSync(dirPath);
        }
    } catch (err) {
        throw err;
    }
};
// 同步读取json文件
const readFileSync = filePath => {
    try {
        const data = fs.readFileSync(filePath).toString();
        return data;
    } catch (err) {
        throw new Error(`文件读取失败:${err}filePath: ${filePath}`);
    }
};
// 异步读取json文件返回Promise
const readFilePromise = filePath => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                try {
                    resolve(data.toString());
                } catch (e) {
                    reject(e);
                }
            }
        });
    });
};

// 异步读取json文件通过回调
const readFileCall = (filePath, callBack) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            callBack(err);
        } else {
            callBack(JSON.parse(data));
        }
    });
};

// 同步保存json文件
const saveFileSync = (jsonObj, filePath) => {
    try {
        const data = JSON.stringify(jsonObj, null, 2);
        ensureDirectoryExistence(path.dirname(filePath));
        fs.writeFileSync(filePath, data);
    } catch (err) {
        throw err;
    }
};

// 异步保存json文件返回Promise
const saveFilePromise = (jsonObj, filePath) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            filePath,
            typeof jsonObj !== 'string' ? JSON.stringify(jsonObj, null, 2) : jsonObj,
            err => {
                if (err) {
                    reject(err);
                } else {
                    resolve(jsonObj);
                }
            }
        );
    });
};
// 异步保存json文件通过回调
const saveFileCall = (jsonObj, filePath, callBack) => {
    fs.writeFile(filePath, JSON.stringify(jsonObj, null, 2), err => {
        if (err) {
            callBack(err);
        } else {
            callBack(err, filePath);
        }
    });
};

// 异步获取某个目录下的所有文件
const getFilesByDirPromise = dirPath => {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });
};

// 同步获取某个目录下的所有文件
const getFilesByDirSync = dirPath => {
    try {
        return fs.readdirSync(dirPath);
    } catch (err) {
        throw err;
    }
};

const fileExistPromise = (filePath, isCreate, obj, file = '.json') => {
    return new Promise((resolve, reject) => {
        fs.exists(filePath, status => {
            if (!status) {
                if (isCreate) {
                    const parent = path.dirname(filePath);
                    fileExistPromise(parent, isCreate)
                        .then(() => {
                            if (filePath.endsWith(file)) {
                                saveFilePromise(obj, filePath)
                                    .then(resolve)
                                    .catch(reject);
                            } else {
                                fs.mkdir(filePath, parentErr => {
                                    if (parentErr) {
                                        reject(parentErr);
                                    }
                                    resolve(filePath);
                                });
                            }
                        })
                        .catch(() => {
                            fs.mkdir(parent, parentErr => {
                                if (parentErr) {
                                    reject(parentErr);
                                }
                                resolve(filePath);
                            });
                        });
                } else {
                    reject(status);
                }
            } else if (filePath.endsWith(file)) {
                saveFilePromise(obj, filePath)
                    .then(resolve)
                    .catch(reject);
            } else {
                resolve(filePath);
            }
        });
    });
};

const checkFileExistPromise = filePath => {
    return new Promise((resolve, reject) => {
        fs.exists(filePath, status => {
            if (status) {
                resolve(filePath);
            } else {
                reject(new Error(`${filePath}不存在`));
            }
        });
    });
};

const deleteDirPromise = dir => {
    return new Promise((resolve, reject) => {
        checkFileExistPromise(dir)
            .then(() => {
                fs.readdir(dir, (errs, files) => {
                    if (errs) {
                        reject(errs);
                    } else {
                        Promise.all(
                            files.map(file => {
                                return new Promise((res, rej) => {
                                    const curPath = `${dir}/${file}`;
                                    fs.stat(curPath, (err, stat) => {
                                        if (err) {
                                            rej(err);
                                        } else if (stat.isDirectory()) {
                                            deleteDirPromise(curPath)
                                                .then(() => {
                                                    res(curPath);
                                                })
                                                .catch(dirErr => {
                                                    rej(dirErr);
                                                });
                                        } else {
                                            fs.unlink(curPath, fileErr => {
                                                if (fileErr) {
                                                    rej(fileErr);
                                                } else {
                                                    res(curPath);
                                                }
                                            });
                                        }
                                    });
                                });
                            })
                        )
                            .then(() => {
                                fs.rmdir(dir, err => {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        resolve(dir);
                                    }
                                });
                            })
                            .catch(err => {
                                reject(err);
                            });
                    }
                });
            })
            .catch(err => reject(err));
    });
};

const getDirListPromise = (dir, baseName) => {
    return new Promise((resolve, reject) => {
        checkFileExistPromise(dir)
            .then(() => {
                fs.readdir(dir, (errs, files) => {
                    if (errs) {
                        reject(errs);
                    } else {
                        resolve(
                            files.map(file => {
                                if (baseName) {
                                    return path.basename(file);
                                }
                                return file;
                            })
                        );
                    }
                });
            })
            .catch(err => reject(err));
    });
};

const getDirNamePromise = filePath => {
    return new Promise((resolve, reject) => {
        fs.exists(filePath, status => {
            if (status) {
                resolve(path.dirname(filePath));
            } else {
                reject(new Error(`${filePath}不存在`));
            }
        });
    });
};

const writeFile = (file, dataBuffer) => {
    return new Promise((res, rej) => {
        fs.writeFile(file, dataBuffer, err => {
            if (err) {
                rej(err);
            } else {
                res(file);
            }
        });
    });
};

const writeFileRecursive = (path, buffer) => {
    let lastPath = path.substring(0, path.lastIndexOf('/'));
    return new Promise((res, rej) => {
        fs.mkdir(lastPath, { recursive: true }, err => {
            if (err) return rej(err);
            fs.writeFile(path, buffer, function(err) {
                if (err) return res(err);
                return res(null);
            });
        });
    });
};

export {
    fileExist,
    ensureDirectoryExistence,
    readFileSync,
    readFilePromise,
    readFileCall,
    saveFileSync,
    saveFilePromise,
    saveFileCall,
    deleteDirectoryFile,
    deleteJsonFile,
    getFilesByDirPromise,
    getFilesByDirSync,
    fileExistPromise,
    checkFileExistPromise,
    deleteDirPromise,
    getDirListPromise,
    getDirNamePromise,
    writeFile,
    writeFileRecursive,
    openDirSync,
};
