import Vue from 'vue';
import VueRouter from 'vue-router';
import ViewUI from 'view-design';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/pages/home'),
    },
    {
        path: '/menu',
        name: 'Menu',
        component: () => import(/* webpackChunkName: "about" */ '@/pages/menu'),
    },
    {
        path: '/reader',
        name: 'ReaderTemplate',
        component: () => import(/* webpackChunkName: "reader" */ '@/pages/reader/template'),
        children: [
            {
                path: '/',
                component: () => import(/* webpackChunkName: "reader" */ '@/pages/reader'),
            },
        ],
    },
    {
        path: '/404',
        name: 'tip404',
        component: () => import(/* webpackChunkName: "tip404" */ '@/pages/error/404'),
    },
    {
        path: '*',
        redirect: '/404',
    },
];

const router = new VueRouter({
    routes,
});

router.beforeEach((to, from, next) => {
    ViewUI.LoadingBar.start();
    console.group();
    console.log('to');
    console.table(to);
    console.log('from');
    console.table(from);
    console.groupEnd();
    next();
});

router.afterEach(route => {
    ViewUI.LoadingBar.finish();
});

export default router;
