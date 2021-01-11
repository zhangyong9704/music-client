import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component:() =>import('../pages/index/Home')
    },
    {
      path: '/search',
      name: 'search',
      component:() =>import('../pages/search/SearchData')
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
