import Layout from "./views/layout/layout"
const routers = [
    {
        path: '/',
        redirect: '/dashboard',
        component: Layout,
        children: [{
            path: 'dashboard',
            name:'dashboard',
            meta:{title: '首页'},
            component: (resolve) => require(['./views/filesystem/filesystem.vue'], resolve)
        }]
    }
];
export default routers;