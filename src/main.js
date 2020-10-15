import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ViewUI from 'view-design';
import { normalizeBooks } from '@/utils/utils';
import '@/assets/css/reset.less';
import '@/assets/css/theme.less';

Vue.prototype.$normalizeBooks = normalizeBooks;
Vue.config.productionTip = false;
Vue.use(ViewUI, {
    transfer: true,
    size: 'small',
    capture: false,
});

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
