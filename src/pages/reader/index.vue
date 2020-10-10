<template>
    <div class="el-reader-container">
        小说阅读器界面
        <Button type="primary" size="large" @click="openFile">打开文件</Button>
        <Button @click="returnPage">返回</Button>
    </div>
</template>

<script>
import electron from 'electron';
const { app, dialog } = electron.remote;
import { readFilePromise, fileExist } from '@/utils/fileHelper';

export default {
    methods: {
        readData(path) {
            if (fileExist(path)) {
                //读取txt文件
            }
        },
        returnPage() {
            window.history.go(-1);
        },
        openFile() {
            dialog
                .showOpenDialog({
                    title: '打开电子书',
                    properties: ['openFile'],
                })
                .then(result => {
                    if (result.filePaths) {
                        this.readData(result.filePaths[0]);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
    },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
