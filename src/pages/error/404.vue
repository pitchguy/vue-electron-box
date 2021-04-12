<template>
    <div>
        <img class="error-404" :src="page404" alt="404" />
        <div class="error-ct" style="text-align:center;">
            404 你要访问的页面不存在，请
            <span class="back-tip" @click="redirct">返回</span>
        </div>
    </div>
</template>

<script>
import page404 from '@/assets/images/pic_404.png';
export default {
    data() {
        return {
            page404,
        };
    },
    methods: {
        redirct() {
            this.$router.go(-1);
        },
    },
};
</script>

<style lang="less" scoped>
.error-404 {
    margin: 120px auto 60px;
    display: block;
    height: 230px;
}
.error-ct {
    font-size: 14px;
    color: #666666;
    .back-tip {
        cursor: pointer;
        text-align: center;
        color: #2482d2;
    }
}
</style>
