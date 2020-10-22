<template>
    <div class="build-container">
        <h3 class="origin-projects">远端项目：</h3>
        <!-- //! 加切换远端git源的select -->
        <Row :gutter="16">
            <Col span="6" v-for="item in projectList" :key="item.id">
                <Card bordered>
                    <p slot="title">
                        <Icon type="md-folder" />
                        {{ item.name }}
                    </p>
                    <a href="#" slot="extra">
                        <Poptip trigger="hover" placement="bottom" width="100">
                            <Icon type="md-menu" style="font-size: 18px;line-height: 24px;" />
                            <ul class="build-control" slot="content">
                                <li @click="svnBuild">通过svn创建项目</li>
                                <li @click="sshBuild">通过ssh创建项目</li>
                            </ul>
                        </Poptip>
                    </a>

                    <ul class="build-ul">
                        <li class="build-svn">
                            <Tooltip max-width="300" :content="item.svn_url">
                                <p>
                                    <span class="svn-color">svn地址</span>
                                    ：{{ item.svn_url }}
                                </p>
                            </Tooltip>
                        </li>
                        <li class="build-ssh">
                            <Tooltip max-width="300" :content="item.ssh_url">
                                <p>
                                    <span class="ssh-color">ssh地址</span>
                                    ：{{ item.ssh_url }}
                                </p>
                            </Tooltip>
                        </li>
                        <li v-if="item.language">
                            <Tag color="primary">{{ item.language }}</Tag>
                        </li>
                        <li class="build-des">
                            <Tooltip max-width="200" :content="item.description || '暂无'">
                                <p>
                                    <span class="des-color">项目描述</span>
                                    ：{{ item.description || '暂无' }}
                                </p>
                            </Tooltip>
                        </li>
                        <li>
                            <span class="title-color">创建时间</span>
                            ：{{ item.created_at }}
                        </li>
                        <li>
                            <span class="title-color">上次更新</span>
                            ：{{ item.updated_at }}
                        </li>
                    </ul>
                </Card>
            </Col>
        </Row>
        <locale-temp
            ref="localeTemp"
            :localList="localList"
            :shellData="shellData"
            :projectList="projectList"
            @setShell="setShell"
        />
        <!-- -----------------分割线----------------- -->
        <!-- shell -->
        <shell-modal
            :code="shellData.code"
            :loading="shellData.btnLoading"
            :options="shellData.options"
            :visible="shellData.shellVisible"
            :addData="shellData.newPjData"
            @close="closeLocaleModal"
            @reset="resetShell"
        />
        <BackTop />
        <return-btn name="返回上一页" url="/" />
    </div>
</template>

<script>
import dayjs from 'dayjs';
import { githubGet } from '@/utils/github';
import { getUserinfo } from '@/utils/tools';
import { readFileSync, fileExist, writeFileRecursive, readFileCall } from '@/utils/fileHelper';
import ReturnBtn from '@/components/returnBtn';
import LocaleTemp from './components/locale';
import ShellModal from './components/shell';

export default {
    components: {
        ReturnBtn,
        ShellModal,
        LocaleTemp,
    },
    data: () => ({
        projectList: [], //远程项目数据
        localList: [], //本地项目数据
        shellData: {
            code: '',
            shellVisible: false,
            btnLoading: true,
            newPjData: {},
            options: {
                tabSize: 2,
                mode: 'text/x-sh',
                theme: 'dracula',
                lineNumbers: true,
                line: true,
                readOnly: true,
            },
        },
    }),
    mounted() {
        this.getRemoteProjects();
        this.getLocaleProjects();
    },
    methods: {
        //获取远程项目
        getRemoteProjects() {
            githubGet('/users/pitchguy/repos', {
                username: 'pitchguy',
            }).then(res => {
                res.data.forEach(child => {
                    child.created_at = dayjs(child.created_at).format('YYYY-MM-DD HH:mm:ss');
                    child.updated_at = dayjs(child.updated_at).format('YYYY-MM-DD HH:mm:ss');
                });
                this.projectList = res.data;
            });
        },
        //获取本地项目
        getLocaleProjects() {
            const { homedir } = getUserinfo();
            if (fileExist(`${homedir}/Documents/.locale.json`)) {
                readFileCall(`${homedir}/Documents/.locale.json`, res => {
                    if (res) {
                        res.projects.forEach(child => {
                            child.created_at = child.created_at
                                ? dayjs(child.created_at).format('YYYY-MM-DD HH:mm:ss')
                                : '';
                        });
                    }
                    this.$set(this, 'localList', res.projects);
                });
            } else {
                const data = JSON.stringify({
                    projects: [],
                    remote: 'pitchguy',
                });
                writeFileRecursive(`${homedir}/Documents/.locale.json`, data).then(res => {
                    this.$Message.info(
                        `生成本地json文件成功，地址${homedir}/Documents/.locale.json`
                    );
                });
            }
        },
        //设置shell数据
        setShell(obj) {
            this.$set(this, 'shellData', { ...this.shellData, ...obj });
        },
        //重制shell面板
        resetShell() {
            this.$set(this, 'shellData', {
                code: '',
                shellVisible: false,
                btnLoading: true,
                newPjData: {},
                options: {
                    tabSize: 2,
                    mode: 'text/x-sh',
                    theme: 'dracula',
                    lineNumbers: true,
                    line: true,
                    readOnly: true,
                },
            });
            this.getLocaleProjects();
        },
        //设置本地项目模块的参数
        closeLocaleModal() {
            this.$refs['localeTemp'].changeModalVisible('modalVisible', false);
        },
        //改变弹框状态
        changeModalVisible(name, bool) {
            this.$set(this, name, bool);
        },
        svnBuild() {},
        sshBuild() {},
    },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
