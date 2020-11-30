<template>
    <div class="vip-music-container">
        <return-btn name="返回上一页" />
    </div>
</template>

<script>
import ReturnBtn from '@/components/returnBtn';

export default {
    name: 'vipMusic',
    components: {
        ReturnBtn,
    },
    data: () => ({
        aa: '',
    }),
    methods: {},
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
