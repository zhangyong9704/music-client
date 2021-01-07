<template>
  <!--主页歌单、歌曲的布局样式-->
  <div class="content-list">
    <ul class="section-content">
      <li class="content-item" v-for="(item,index) in contentList" :key="index">
<!--        <div class="kuo" >-->
<!--          <img class="item-img" src="../assets/img/43.jpg" alt="">-->
<!--&lt;!&ndash;          <div class="mask">&ndash;&gt;-->
<!--&lt;!&ndash;            <svg class="icon">&ndash;&gt;-->
<!--&lt;!&ndash;              <use xlink:href="#icon-bofang"></use>&ndash;&gt;-->
<!--&lt;!&ndash;            </svg>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--        </div>-->
        <el-card :body-style="{ padding: '1px' }">
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image" alt="">
          <div style="padding: 14px;" class="clearfix">
            <span>
              <el-link type="danger" icon="el-icon-headset">
                {{processingFieldLength(item.name||item.title)}}
              </el-link>
              <span class="stars">
                <i :class="item.icon"  >500</i>
              </span>
            </span>
            <div class="bottom clearfix">
              <time class="time">{{item.createTime}}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'content-list',
    props: {
      contentList:[],
      icon:''
    },  //子组件接收的数据
    data(){
      return{

      }
    },
    created () {
    },
    methods:{

      //处理歌单、歌手标题过长问题
      processingFieldLength(title){
        return title?title.length<=10?title:title.substring(0,10)+"...":title;
      },

      getFieldLength(field){
        return (field || field ==='')?0:field.length
      }

    }
  }
</script>

<style scoped>
@import "../assets/css/content-list.scss";
</style>
