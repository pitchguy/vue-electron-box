<template>
    <div>
        <h3 class="locale-projects">本地项目：</h3>
        <Row :gutter="16">
            <div v-if="localList.length > 0">
                <Col span="6" v-for="item in localList" :key="item.id">
                    <Card bordered>
                        <p slot="title">
                            <Icon type="md-folder" />
                            {{ item.localeName }}
                        </p>
                        <a href="#" slot="extra">
                            <Poptip trigger="hover" placement="bottom" width="100">
                                <Icon type="md-menu" style="font-size: 18px;line-height: 24px;" />
                                <ul class="build-control" slot="content">
                                    <!-- <li @click="openLocalte">通过svn创建项目</li>
                                    <li @click="sshBuild">通过ssh创建项目</li> -->
                                </ul>
                            </Poptip>
                        </a>

                        <ul class="build-ul">
                            <li class="build-svn">
                                <Tooltip max-width="300" :content="item.localePath">
                                    <p>
                                        <span class="svn-color">项目路径</span>
                                        ：{{ item.localePath }}
                                    </p>
                                </Tooltip>
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
                        </ul>
                    </Card>
                </Col>
            </div>
            <Col
                span="6"
                style="cursor: pointer;"
                @click.native="changeModalVisible('modalVisible', true)"
            >
                <Card bordered style="text-align: center;padding-top: 110px;">
                    <Icon type="md-add" style="font-size: 50px;" />
                </Card>
            </Col>
        </Row>
        <!-- 添加项目对话框 -->
        <Modal
            title="添加本地项目"
            v-model="modalVisible"
            class-name="vertical-center-modal"
            closable
            @on-cancel="modalCancel"
        >
            <Form ref="projectForm" :model="formItem" :rules="rules" :label-width="100">
                <FormItem prop="localePath" label="文件路径:">
                    <Input disabled v-model="formItem.localePath" placeholder="请选择文件路径">
                        <Button
                            slot="append"
                            icon="ios-add-circle-outline"
                            @click="choosePath"
                        ></Button>
                    </Input>
                </FormItem>
                <FormItem prop="localeName" label="项目名称:">
                    <Input v-model="formItem.localeName" placeholder="请输入项目名称" />
                </FormItem>
                <FormItem prop="remoteProject" label="远程项目:">
                    <Select v-model="formItem.remoteProject" placeholder="请选择远程项目">
                        <Option v-for="item in projectList" :key="item.id" :value="item.id">
                            {{ item.name }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="拉取方式:">
                    <RadioGroup v-model="formItem.type">
                        <Radio label="svn">SVN</Radio>
                        <Radio label="ssh">SSH</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="项目描述:">
                    <Input
                        v-model="formItem.description"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 5 }"
                        placeholder="请输入相应的项目描述"
                    />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="modalCancel">取 消</Button>
                <Button type="primary" @click="modalOk">开始生成</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import electron from 'electron';
import { spawn } from 'child_process';
import { getUserinfo } from '@/utils/tools';
import { eleNotify } from '@/utils/electronHelper';
import { readFileSync, fileExist, writeFileRecursive, readFileCall } from '@/utils/fileHelper';

const { dialog } = electron.remote;
export default {
    name: 'localeTemp',
    props: {
        localList: Array,
        projectList: Array,
        shellData: Object,
        setShell: Function,
    },
    data: () => ({
        modalVisible: false, //弹框bool
        formItem: {
            //表单数据
            localePath: '',
            localeName: '',
            remoteProject: '',
            type: 'svn',
            description: '',
        },
        rules: {
            //表单规则
            localePath: [{ required: true, message: '请选择文件路径', trigger: 'blur' }],
            localeName: [
                { required: true, message: '请输入项目名称', trigger: 'blur' },
                {
                    required: true,
                    asyncValidator: (rule, value) => {
                        return new Promise((resolve, reject) => {
                            const { homedir } = getUserinfo();
                            const localeProjectsNames = JSON.parse(
                                readFileSync(`${homedir}/Documents/.locale.json`)
                            ).projects.map(res => res.localeName);
                            if (localeProjectsNames.indexOf(value) >= 0) {
                                reject('项目名称与当前本地项目有重复，请修改');
                            } else {
                                resolve();
                            }
                        });
                    },
                    trigger: 'blur',
                },
            ],
            remoteProject: [
                { required: true, type: 'number', message: '请选择远程项目', trigger: 'change' },
            ],
        },
    }),
    methods: {
        //改变弹框状态
        changeModalVisible(name, bool) {
            this.$set(this, name, bool);
        },
        //弹框取消按钮
        modalCancel() {
            this.$refs['projectForm'].resetFields();
            this.changeModalVisible('modalVisible', false);
        },
        //获取需要记录的本地文件夹地址
        choosePath() {
            const { homedir } = getUserinfo();
            dialog
                .showOpenDialog({
                    title: '选择存储路径',
                    defaultPath: `${homedir}/Desktop`,
                    properties: ['openDirectory', 'createDirectory'],
                })
                .then(result => {
                    if (result.filePaths) {
                        this.$set(this.formItem, 'localePath', result.filePaths[0]);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //写入对应package.json对应description和项目名称
        writeJson(name, path, type, des) {
            const { homedir } = getUserinfo();
            const localUrl = `${path}/${name}/package.json`;
            const localeData = JSON.parse(readFileSync(localUrl));

            if (fileExist(localUrl)) {
                localeData.name = name;
                localeData.description = des;
                writeFileRecursive(localUrl, JSON.stringify(localeData, null, 2)).then(res => {
                    this.$emit('setShell', {
                        btnLoading: false,
                        code: this.formatCode('项目创建成功'),
                    });
                    eleNotify({
                        body: '项目创建成功',
                        silent: false,
                    });
                });
            }
        },
        formatCode(code) {
            return `${this.shellData.code} \n${code}`;
        },
        //弹框确认按钮
        modalOk() {
            this.$refs['projectForm'].validate(res => {
                if (res) {
                    const {
                        localeName,
                        localePath,
                        remoteProject,
                        type,
                        description,
                    } = this.formItem;
                    const remote = this.projectList.filter(res => res.id == remoteProject)[0];
                    let remoteUrl = type == 'svn' ? remote.svn_url : remote.ssh_url;
                    let ls = spawn(
                        'cd',
                        [localePath, '&&', 'git', 'clone', remoteUrl, localeName, '--progress'],
                        {
                            shell: true,
                        }
                    );

                    this.$emit('setShell', {
                        shellVisible: true,
                        newPjData: JSON.parse(JSON.stringify(this.formItem, null, 2)),
                        code: `git clone ${remoteUrl}`,
                    });
                    this.$refs['projectForm'].resetFields();
                    this.changeModalVisible('modalVisible', false);

                    ls.stdout.on('data', data => {
                        this.$emit('setShell', { code: this.formatCode(data) });
                    });

                    ls.stderr.on('data', data => {
                        this.$emit('setShell', { code: this.formatCode(data) });
                    });

                    ls.on('close', code => {
                        if (code == 0) {
                            this.writeJson(localeName, localePath, type, description);
                        }
                    });
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
