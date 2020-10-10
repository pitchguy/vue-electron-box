import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ViewUI from 'view-design';
import '@/assets/css/reset.less';
import '@/assets/css/theme.less';

Vue.use(ViewUI, {
    transfer: true,
    size: 'small',
    capture: false,
});

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
