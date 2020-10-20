<template>
    <div class="build-container">
        <!-- 之后在这边加上操作提示 -->
        <Row :gutter="16">
            <Col span="6" v-for="item in projectList" :key="item.id">
                <Card bordered>
                    <p slot="title">
                        <Icon type="md-folder" />
                        {{ item.name }}
                    </p>
                    <a href="#" slot="extra">
                        <Poptip placement="bottom" width="100">
                            <Icon type="md-menu" style="font-size: 18px;line-height: 24px;" />
                            <ul class="build-control" slot="content">
                                <li>通过svn创建项目</li>
                                <li>通过ssh创建项目</li>
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

        <return-btn name="返回上一页" url="/" />
        <BackTop />
    </div>
</template>

<script>
import { githubGet } from '@/utils/github';
import dayjs from 'dayjs';
import ReturnBtn from '@/components/returnBtn';

export default {
    components: {
        ReturnBtn,
    },
    data: () => ({
        projectList: [],
    }),
    mounted() {
        this.getProjects();
    },
    methods: {
        getProjects() {
            this.$Spin.show();
            githubGet('/users/pitchguy/repos', {
                username: 'pitchguy',
            }).then(res => {
                res.data.forEach(child => {
                    child.created_at = dayjs(child.created_at).format('YYYY-MM-DD HH:mm:ss');
                    child.updated_at = dayjs(child.updated_at).format('YYYY-MM-DD HH:mm:ss');
                });
                this.projectList = res.data;
                this.$Spin.hide();
            });
        },
    },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
