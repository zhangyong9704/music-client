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
//   } else if (to.meta.permission) {
//     // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//     role === 'admin' ? next() : next('/403');
//   } else {
//     // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
//     if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
//       Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
//         confirmButtonText: '确定'
//       });
//     } else {
//       next();
//     }
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

