<template>
  <div class="app-container">
    <return-btn v-if="showBack" name="返回上一页" />
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
  </div>
</template>

<script>
import ReturnBtn from '@/components/returnBtn';

export default {
  name: 'AppLayout',
  components: { ReturnBtn },
  data() {
    return {
      showBack: false,
    };
  },
  watch: {
    '$route.path': {
      handler(val) {
        let neverShow = ['/home'];
        this.showBack = neverShow.indexOf(val) < 0;
      },
      immediate: true,
    },
  },
  methods: {},
};
</script>
