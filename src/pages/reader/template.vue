<template>
    <div class="el-template">
        <return-btn name="返回上一页" url="/" />
        <router-view></router-view>
        <BackTop />
    </div>
</template>

<script>
import ReturnBtn from '@/components/returnBtn';
export default {
    components: {
        ReturnBtn,
    },
};
</script>

<style lang="less" scoped></style>
