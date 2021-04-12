<template>
  <div>
    <Button type="error" @click="testCom1">测试</Button>
    <code-mirror :code="code" :options="options" />
  </div>
</template>

<script>
import electron from 'electron';
import { spawn } from 'child_process';
import CodeMirror from '@/components/codeMirror';
import { getUserinfo } from '@/utils/tools';
import { readFileSync, fileExist, writeFileRecursive, readFileCall } from '@/utils/fileHelper';
const { Notification } = electron.remote;

export default {
  components: {
    CodeMirror,
  },
  data: () => ({
    code: '',
    options: {
      tabSize: 2,
      mode: 'text/x-sh',
      theme: 'dracula',
      lineNumbers: true,
      line: true,
      readOnly: true,
    },
  }),
  methods: {
    formatCode(code) {
      return `${this.code} \n${code}`;
    },
    testCom1() {
      if (Notification.isSupported()) {
        let notify = new Notification({
          title: '',
          subtitle: '',
          body: '项目创建成功',
          silent: false,
        });

        notify.show();
      }
    },
  },
};
</script>

<style></style>
