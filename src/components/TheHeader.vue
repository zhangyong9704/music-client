<template>
  <div class="the-header">
    <!--左侧logo图标-->
    <div class="header-logo" >
      <svg class="icon">
        <use xlink:href = "#icon-erji"></use>
      </svg>
      <span>music</span>
    </div>
    <!--左侧浏览的菜单栏-->
    <ul class="navbar">
      <li v-for="(item,index) in leftHeaderList" :key="index" >
        <i :class="item.icon"></i>
        <a>{{item.title}}</a>
      </li>
    </ul>
    <!--中间搜索框-->
    <div class="header-middle">
      <div class="header-search">
        <input type="text" placeholder="搜索音乐" v-model="keyWords">
        <div class="search-btn" >
          <svg class="icon">
            <use xlink:href = "#icon-sousuo"></use>
          </svg>
        </div>
      </div>
    </div>
    <!--登录注册部分-->
    <ul class="navbar">
      <li v-for="(item,index) of rightHeaderList" :key="index">
        <i :class="item.icon"></i>
        <a>{{item.title}}</a>
      </li>
    </ul>
    <!--右边用户头像部分-->
    <div class="header-right" v-show="true">
      <div id='user'>
        <img src='../assets/img/user.jpg' alt="">
      </div>
      <span><strong>用户名</strong></span>
      <ul class="menu">
        <li v-for="(item,index) of dropMenuList" :key="index" >
          <i :class="item.icon"></i>
          <a>{{item.title}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'the-header',
    data(){
      return{
        keyWords: '',

        leftHeaderList: [
          {
            icon: 'el-icon-s-home',
            title: '首页'
          },
          {
            icon: 'el-icon-s-data',
            title: '歌手'
          },
          {
            icon: 'el-icon-s-management',
            title: "歌单"
          },
          {
            icon: 'el-icon-s-custom',
            title: '我的音乐'
          }
      ],
        rightHeaderList: [
          {
            icon: 'el-icon-s-promotion',
            title: '注册'
          },
          {
            icon: 'el-icon-s-check',
            title: '登录'
          },
          {
            icon: 'el-icon-s-opportunity',
            title: '关于我们'
          },
        ],
        dropMenuList: [ //用户下拉设置
          {
            icon: 'el-icon-s-opportunity',
            title: '关于我们'
          },
          {
            icon: 'el-icon-s-opportunity',
            title: '关于我们'
          },
        ],
      }
    },
    created () {
    }
  }
</script>

<style lang="scss" scoped>
@import "../assets/css/the-header.scss";
</style>
