<template>
  <!--主页歌单、歌曲的布局样式-->
  <div class="content-list">
    <ul class="section-content">
      <li class="content-item" v-for="(item,index) in contentList" :key="index">
        <div class="kuo" >
          <img class="item-img" src="../assets/img/insertion-600x400.jpg">
          <div class="mask">
            <svg class="icon">
              <use xlink:href="#icon-bofang"></use>
            </svg>
          </div>
        </div>
        <p class="item-name">{{item.name||item.title}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'content-list',
    props: ['contentList'],  //子组件接收的数据
    data(){
      return{

      }
    },
    created () {
    },
    methods:{

    }
  }
</script>

<style scoped>
@import "../assets/css/content-list.scss";
</style>
