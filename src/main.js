import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/index.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/js/iconfont.js'
import '@/assets/js/iconfont1.js'
import '@/assets/js/iconfont2.js'
import '@/assets/js/iconfont3.js'
import 'font-awesome/css/font-awesome.min.css'  //font-awesome字体图标组件库
import store from './store';   //状态管理
import mixin from './mixins';  //引入全局共有方法部分
import APlayer from '@moefe/vue-aplayer';   //a-palyer组件

Vue.use(ElementUI)
Vue.mixin(mixin);
// Vue.use(APlayer, {
//   defaultCover: 'https://github.com/u3u.png',
// });

Vue.config.productionTip = false

//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//   const role = localStorage.getItem('user_info');
//   if (!role && to.path !== '/login') {
//     next('/login');
//   }
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

