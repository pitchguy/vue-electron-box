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
        <div class="list-container">
            <h4 class="name">
                男生最爱
                <i class="tip"></i>
            </h4>
            <List size="large" item-layout="vertical">
                <ListItem v-for="book in maleList" :key="book._id" @click="goBooks(book._id)">
                    <div @click="goBooks(book.id)">
                        <ListItemMeta
                            avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                            :title="book.title"
                            :description="`作者：${book.author} 类型：${book.major}、${book.minor}`"
                        />
                        {{ book.shortIntro }}
                        <template slot="action">
                            <li>
                                <Icon type="ios-star-outline" />
                                {{ book.latelyFollower }}
                            </li>
                            <li>
                                <Icon type="ios-thumbs-up-outline" />
                                {{ book.retentionRatio + '%' }}
                            </li>
                            <!-- <li>
                            <Icon type="ios-chatbubbles-outline" />
                            345
                        </li> -->
                        </template>
                        <template slot="extra">
                            <img
                                src="https://img.17k.com/cmsimg/recommend/2020/10/1602469911.9455.jpg"
                                style="width: 280px"
                            />
                        </template>
                    </div>
                </ListItem>
            </List>
        </div>
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
        maleList: [],
        femaleList: [],
    }),
    created() {
        getRank('54d42d92321052167dfb75e3', {}).then(res => {
            console.log('=========male=========');
            console.log(res);
            console.log('=========male=========');
            if (res.ok) {
                this.maleList = this._unEscape(this.$normalizeBooks(res.ranking.books.slice(0, 5)));
            }
        });
        getRank('54d43437d47d13ff21cad58b', {}).then(res => {
            console.log('=========female=========');
            console.log(res);
            console.log('=========female=========');
            if (res.ok) {
                this.femaleList = this._unEscape(
                    this.$normalizeBooks(res.ranking.books.slice(0, 5))
                );
            }
        });
    },
    methods: {
        goBooks(id) {
            console.log(id);
        },
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
        _unEscape(arr) {
            for (let i = 0; i < arr.length; i++) {
                arr[i].cover = unescape(arr[i].cover);
                arr[i].cover = arr[i].cover.replace('/agent/', '');
            }
            return arr;
        },
    },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
