<template>
  <div class="the-header">
    <!--左侧logo图标-->
    <div class="header-logo" >
      <svg class="icon">
        <use xlink:href = "#icon-erji"></use>
      </svg>
      <span>Music</span>
    </div>
    <!--左侧浏览的菜单栏-->
    <ul class="navbar">
      <li v-for="(item,index) in leftHeaderList" :key="index"
          :class="{active:index===leftHaderIndex}" @click="getHeaderIndex(index,'left',item.path)">
        <i :class="item.icon"></i>
        <a>{{item.title}}</a>
      </li>
    </ul>
    <!--中间搜索框-->
    <div class="header-middle">
      <div class="header-search">
        <input type="text" placeholder="搜索..." v-model="keyword">
        <div class="search-btn" @click="goSearch()" >
          <svg class="icon">
            <use xlink:href = "#icon-sousuo"></use>
          </svg>
        </div>
      </div>
    </div>
    <!--登录注册部分-->
    <ul class="navbar" >
      <li v-for="(item,index) in rightHeaderList" :key="index"
          :class="{active:index===rightHeaderIndex}" @click="getHeaderIndex(index,'right',item.path)">
        <i :class="item.icon"></i>
        <a>{{item.title}}</a>
      </li>
    </ul>
    <!--右边用户头像部分-->
    <div class="header-right" v-show="true">
      <div id='user'>
        <img src='../assets/img/user.jpg' alt="" >
      </div>
      <span class="name">用户名</span>
      <ul class="menu">
        <li v-for="(item,index) in dropMenuList" :key="index" >
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
        keyword: '',
        leftHaderIndex:-1,  //左侧菜单栏点击获取下标值
        rightHeaderIndex:-1, //右侧菜单栏点击判断
        leftHeaderList: [   //左侧侧边栏内容
          {
            icon: 'el-icon-s-home',
            path: '/',
            title: '首页'
          },
          {
            icon: 'el-icon-s-data',
            path: '/singer',
            title: '歌手'
          },
          {
            icon: 'el-icon-s-management',
            path: 'song-list',
            title: "歌单"
          },
          {
            icon: 'el-icon-s-custom',
            path: 'my-music',
            title: '我的音乐'
          }
        ],
        rightHeaderList: [   //右侧侧边栏内容
          {
            icon: 'el-icon-s-promotion',
            path: '/register',
            title: '注册'
          },
          {
            icon: 'el-icon-s-check',
            path: '/login',
            title: '登录'
          },
          {
            icon: 'el-icon-s-opportunity',
            path: '/about',
            title: '关于我们'
          },
        ],
        dropMenuList: [       //用户下拉内容设置
          {
            icon: 'el-icon-star-off',
            path: '/profile',
            title: '个人中心'
          },
          {
            icon: 'el-icon-star-off',
            path: '/setting',
            title: '设置中心'
          },
        ],

      }
    },
    methods:{
      //显示激活的选项卡
      getHeaderIndex(index,flag,path){
        if ("left"===flag){
          this.leftHaderIndex = index;
          this.rightHeaderIndex = -1;
          this.$router.push({path:path})
        }else{
          this.rightHeaderIndex = index;
          this.leftHaderIndex = -1;
          this.$router.push({path:path})
        }
      },

      //搜索跳转
      goSearch(){
        if (this.keyword || this.keyword!==''){
          this.$router.push({path:'/search',query:{keyword:this.keyword}})
          //this.keyword=''
        }else{
          this.$notify({
            duration: 2000,
            offset: 70,
            message: '请输入搜索的关键词',
            type: 'warning'
          });
        }
      },

    },
    mounted () {
        document.querySelector('#user').addEventListener('click',function(e){
          document.querySelector('.menu').classList.add("show");
          e.stopPropagation()           //关键在于阻止冒泡
        },false);
        document.querySelector('.menu').addEventListener('click',function(e){
          e.stopPropagation()           //点击菜单内部时，阻止时间冒泡，这样，点击内部时，菜单不会关闭
        },false);
        document.addEventListener('click',function(){
          document.querySelector('.menu').classList.remove('show');
        },false);
    },
  }
</script>

<style lang="scss" scoped>
@import "../assets/css/the-header.scss";
</style>
