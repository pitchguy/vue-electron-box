<template>
    <div class="el-reader-container">
        <Menu mode="horizontal" theme="dark" :active-name="activeName" @on-select="selectMenu">
            <MenuItem :name="name" v-for="{ name, icon } in menuList" :key="name">
                <Icon :type="icon" />
                {{ name }}
            </MenuItem>
            <div class="el-extra-menu">
                <MenuItem :name="name" v-for="{ name, icon } in settingList" :key="name">
                    <Icon :type="icon" />
                    {{ name }}
                </MenuItem>
            </div>
        </Menu>
    </div>
</template>

<script>
import electron from 'electron';
import ReturnBtn from '@/components/returnBtn';
const { app, dialog } = electron.remote;
import { readFilePromise, fileExist } from '@/utils/fileHelper';
import { getRank } from '@/utils/apis';

export default {
    components: {
        ReturnBtn,
    },
    data: () => ({
        menuList: [
            { name: '首页', icon: 'ios-home', route: '/reader' },
            { name: '分类', icon: 'ios-list', route: '' },
            { name: '排行', icon: 'ios-trending-down', route: '' },
            { name: '书单', icon: 'ios-book-outline', route: '' },
        ],
        settingList: [
            { name: '设置', icon: 'ios-settings-outline' },
            { name: '本地文件', icon: 'ios-folder-outline' },
        ],
        activeName: '',
    }),
    mounted() {
        getRank('54d42d92321052167dfb75e3', {}).then(res => {
            console.log(res);
        });
    },
    methods: {
        selectMenu(name) {
            let settingNames = ['设置', '本地文件'];

            if (!settingNames.includes(name)) {
                this.activeName = name;
            } else if (name == '本地文件') {
                this.openFile();
            } else if (name == '设置') {
                //展示设置modal
            }
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
        readData(path) {
            if (fileExist(path)) {
                //读取txt文件
                this.$Spin.show();
                readFilePromise(path).then(res => {
                    if (res) {
                        this.$Spin.hide();
                        console.log(res);
                    }
                });
            }
        },
    },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
