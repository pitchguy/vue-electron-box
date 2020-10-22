<template>
    <div>
        <codemirror ref="cmEditor" :value="code" :options="options" />
    </div>
</template>

<script>
import { codemirror } from 'vue-codemirror';
import 'codemirror/mode/shell/shell.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/solarized.css';

export default {
    name: 'codeMirror',
    props: {
        code: {
            type: String,
            default: '',
        },
        options: {
            type: Object,
            default: {
                tabSize: 2,
                line: true,
                lineNumbers: true,
            },
        },
    },
    components: {
        codemirror,
    },
    data() {
        return {};
    },
    methods: {},
    computed: {
        codemirror() {
            return this.$refs.cmEditor.codemirror;
        },
    },
    mounted() {
        console.log('the current CodeMirror instance object:', this.codemirror);
    },
};
</script>
