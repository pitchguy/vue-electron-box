<template>
    <Modal
        width="800"
        :closable="false"
        :mask-closable="false"
        title="shell执行情况"
        v-model="visible"
    >
        <code-mirror :code="code" :options="options" />
        <div slot="footer">
            <Button :loading="loading" type="success" @click="modalOk">确 定</Button>
        </div>
    </Modal>
</template>

<script>
import dayjs from 'dayjs';
import CodeMirror from '@/components/codeMirror';
import { getUserinfo, getuuid } from '@/utils/tools';
import { eleNotify } from '@/utils/electronHelper';
import { readFileSync, fileExist, writeFileRecursive, readFileCall } from '@/utils/fileHelper';

export default {
    name: 'buildShell',
    components: {
        CodeMirror,
    },
    props: {
        code: String,
        options: Object,
        addData: Object,
        loading: {
            type: Boolean,
            default: true,
        },
        visible: {
            type: Boolean,
            default: false,
        },
        close: Function,
        reset: Function,
    },
    data: () => ({}),
    methods: {
        modalOk() {
            const { homedir } = getUserinfo();
            const newProject = JSON.parse(readFileSync(`${homedir}/Documents/.locale.json`));
            let project = Object.assign(this.addData, { id: getuuid(), created_at: dayjs() });

            newProject.projects.push(project);
            writeFileRecursive(
                `${homedir}/Documents/.locale.json`,
                JSON.stringify(newProject, null, 2)
            ).then(res => {
                this.$emit('close', 'modalVisible', false);
                this.$emit('reset');
            });
            //关闭modal
            //打开文件夹
        },
    },
};
</script>

<style></style>
