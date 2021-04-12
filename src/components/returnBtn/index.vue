<template>
  <div class="el-affix" :style="{ styled }">
    <Button size="large" icon="md-arrow-back" type="primary" shape="circle" @click="returnPage">
      {{ name }}
    </Button>
  </div>
</template>

<script>
export default {
  name: 'ReturnBtn',
  props: {
    name: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
    styled: {
      type: Object,
      required: false,
    },
  },
  data: () => ({}),
  methods: {
    returnPage() {
      if (this.url) {
        this.$router.push({ path: this.url });
      } else {
        window.history.go(-1);
      }
    },
  },
};
</script>
<style lang="less" scoped>
@import './index.less';
</style>
