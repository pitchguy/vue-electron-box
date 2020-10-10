<template>
    <div class="home">
        <Row :gutter="16" class-name="el-row">
            <Col span="6" v-for="item in funcArr" :key="item.name">
                <router-link :to="item.link">
                    <div class="el-menu">
                        <img :src="item.imgUrl" />
                        <p>{{ item.name }}</p>
                    </div>
                </router-link>
            </Col>
        </Row>
        <Row :gutter="16" class-name="el-row">
            <Col span="6" v-for="item in funcBrr" :key="item.name">
                <div class="el-menu">
                    <img :src="item.imgUrl" />
                    <p>{{ item.name }}</p>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data: () => ({
        funcArr: [
            {
                name: '功能1',
                class: 'el-btn',
                imgUrl: require('@/assets/images/func1.png'),
                link: '',
            },
            {
                name: '功能2',
                class: 'el-btn',
                imgUrl: require('@/assets/images/func2.png'),
                link: '',
            },
            {
                name: '功能3',
                class: 'el-btn',
                imgUrl: require('@/assets/images/func3.png'),
                link: '',
            },
            {
                name: '功能4',
                class: 'el-btn',
                imgUrl: require('@/assets/images/func4.png'),
                link: '/reader',
            },
        ],
        funcBrr: [
            {
                name: '功能5',
                class: 'el-btn',
                imgUrl: require('@/assets/images/func5.png'),
                link: '',
            },
            {
                name: '功能6',
                class: 'el-btn',
                imgUrl: require('@/assets/images/func6.png'),
                link: '',
            },
            {
                name: '功能7',
                class: 'el-btn',
                imgUrl: require('@/assets/images/func7.png'),
                link: '',
            },
            {
                name: '功能8',
                class: 'el-btn',
                imgUrl: require('@/assets/images/func8.png'),
                link: '',
            },
        ],
    }),
    components: {},
    methods: {},
};
</script>
<style lang="less" scoped>
@import './index.less';
</style>
