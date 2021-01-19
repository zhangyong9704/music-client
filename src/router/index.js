import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',   //主页路径
      name: 'home',
      component:() =>import('../pages/index/Home')
    },
    {
      path: '/search',   //搜索结果
      name: 'search',
      component:() =>import('../pages/search/Search')
    },
    {
      path: '/lyric',  //歌词
      name: 'lyric',
      component:() =>import('../pages/lyric/Lyric')
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
