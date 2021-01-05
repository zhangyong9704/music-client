<template>
  <div class="the-header">
    <div class="header-logo" >
      <svg class="icon">
        <use xlink:href = "#icon-erji"></use>
      </svg>
      <span>music</span>
    </div>
    <ul class="navbar">
      <li v-for="(item,index) in headerList" :key="index">
        <i :class="item.icon"></i>
        <a>{{item.title}}</a>
      </li>
      <li>
        <div class="header-search">
          <input type="text" placeholder="搜索音乐" v-model="keyWords">
          <div class="search-btn" >
            <svg class="icon">
              <use xlink:href = "#icon-sousuo"></use>
            </svg>
          </div>
        </div>
      </li>
    </ul>
  </div>

</template>

<script>
  export default {
    name: 'the-header',
    data(){
      return{
        keyWords: '',

        headerList: [
          {
            icon: 'el-icon-s-home',
            title: '首页'
          },
          {
            icon: 'el-icon-notebook-2',
            title: '歌手'
          },
          {
            icon: 'el-icon-notebook-2',
            title: "歌单"
          },
          {
            icon: 'el-icon-notebook-2',
            title: '我的音乐'
          },
      ]
      }
    },
    created () {
    }
  }
</script>

<style lang="scss" scoped>
@import "../assets/css/the-header.scss";
</style>
