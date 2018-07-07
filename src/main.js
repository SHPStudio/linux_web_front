import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import axios from 'axios';
import vueAxios from 'vue-axios';
axios.defaults.baseURL = '//127.0.0.1:5000/'
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // 对响应错误做点什么
    iView.Message.error("对方不想理你，并向你抛出了个异常");
    return Promise.reject(error);
});

Vue.use(VueRouter);
Vue.use(iView);
Vue.use(vueAxios,axios);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
