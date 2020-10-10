<template>
    <div class="el-reader-container">
        小说阅读器界面
        <Button @click="returnPage">返回</Button>
    </div>
</template>

<script>
export default {
    methods: {
        returnPage() {
            window.history.go(-1);
        },
    },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
