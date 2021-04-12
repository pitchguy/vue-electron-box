<template>
  <div class="anayse-container">
    <div class="analyse-title">VIP视频解析</div>
    <div class="analyse-top-container">
      <Switch></Switch>
      <Select v-model="vipPortData" size="large" class="select-style">
        <Option v-for="item in vipPortList" :value="item.value" :key="item.value">
          {{ item.label }}
        </Option>
      </Select>
      <Input v-model="inputValue" placeholder="输入需要解析的地址" size="large" class="input-style" />
      <Button size="large" type="primary" @click="startAnalyse">
        <Icon type="logo-youtube" />
        播 放
      </Button>
    </div>
    <div class="analyse-middle-container">
      <Input class="input-style" v-model="diyInputValue" placeholder="输入自定义的地址" size="large" />
      <Button size="large" type="primary" @click="startDiyAnalyse" class="btn">
        <Icon type="logo-youtube" />
        播 放
      </Button>
      <Button size="large" type="error" @click="diyInputValue = ''" class="btn">
        <Icon type="logo-youtube" />
        清 除
      </Button>
    </div>
    <div class="iframe-container">
      <iframe
        scrolling="no"
        allowtransparency="true"
        frameborder="0"
        :src="iframeSrc"
        width="100%"
        height="500"
        align="middle"
        hspace="0"
        vspace="0"
        allowfullscreen="true"
        marginheight="0"
        marginwidth="0"
        name="tv"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'analyse',
  data: () => ({
    vipPortData: '',
    inputValue: '',
    iframeSrc: '',
    diyInputValue: '',
    vipPortList: [
      {
        value: 'http://api.bbbbbb.me/jx/?url=',
        label: 'http://api.bbbbbb.me/jx/?url=',
      },
      {
        value: 'http://www.a305.org/weixin.php?url=',
        label: 'http://www.a305.org/weixin.php?url=',
      },
      {
        value: 'http://api.91exp.com/svip/?url=',
        label: 'http://api.91exp.com/svip/?url=',
      },
      {
        value: 'http://api.bbbbbb.me/ipsign/player.php?v=',
        label: 'http://api.bbbbbb.me/ipsign/player.php?v=',
      },
      {
        value: 'http://api.ledboke.com/vip/?url=',
        label: 'http://api.ledboke.com/vip/?url=',
      },
      {
        value: 'http://17kyun.com/api.php?url=',
        label: 'http://17kyun.com/api.php?url=',
      },
      {
        value: 'http://vip.qike.ink/?url=',
        label: 'http://vip.qike.ink/?url=',
      },
      {
        label: 'http://www.47jx.com/?url=',
        value: 'http://www.47jx.com/?url=',
      },
      {
        label: 'http://jx.hanximeng.com/vip.php?url=',
        value: 'http://jx.hanximeng.com/vip.php?url=',
      },
      {
        label: 'http://yun.baiyug.cn/vip/?url=',
        value: 'http://yun.baiyug.cn/vip/?url=',
      },
      {
        label: 'http://jx.myxit.cn/vip/?url=',
        value: 'http://jx.myxit.cn/vip/?url=',
      },
      {
        label: 'http://aikan-tv.com/?url=',
        value: 'http://aikan-tv.com/?url=',
      },
      {
        label: 'http://jiexi.92fz.cn/player/vip.php?url=',
        value: 'http://jiexi.92fz.cn/player/vip.php?url=',
      },
      {
        label: 'http://api.662820.com/xnflv/index.php?url=',
        value: 'http://api.662820.com/xnflv/index.php?url=',
      },
      {
        label: 'http://000o.cc/jx/ty.php?url=',
        value: 'http://000o.cc/jx/ty.php?url=',
      },
      {
        label: 'http://qigetv.xyz/tv.php?url=',
        value: 'http://qigetv.xyz/tv.php?url=',
      },
      {
        label: 'http://jx.quanmingjiexi.com/?url=',
        value: 'http://jx.quanmingjiexi.com/?url=',
      },
    ],
  }),
  methods: {
    startAnalyse() {
      if (!this.vipPortData || !this.inputValue) {
        this.$Message.error(!this.vipPortData ? '请选择解析源' : '请输入解析地址');
        return;
      }

      this.iframeSrc = `${this.vipPortData}${this.inputValue}`;
    },
    startDiyAnalyse() {
      if (!this.diyInputValue) {
        this.$Message.error('请输入解析地址');
        return;
      }
      this.iframeSrc = this.diyInputValue;
    },
  },
};
</script>

<style lang="less" scoped>
@import './index.less';
</style>
