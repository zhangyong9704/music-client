<template>
  <!--主页歌单、歌曲的布局样式-->
  <div class="content-list">
    <ul class="section-content">
      <li class="content-item" v-for="(item,index) in contentList" :key="index">
        <el-card :body-style="{ padding: '1px'}">
          <img :src="getImageURL(item.pic)" class="item-img" alt="暂无图片">
          <div class="mask">
            <svg class="icon">
              <use xlink:href="#icon-bofang"></use>
            </svg>
          </div>
          <div style="padding: 14px;" class="clearfix">
            <span>
              <el-tooltip placement="top">
                <div slot="content">{{item.name||item.title}}</div>

                <el-link type="danger" icon="el-icon-headset">
                  {{processingFieldLength(item.name||item.title)}}
                </el-link>
              </el-tooltip>
              <span>
                <el-tag size="mini" type="success">{{processingFieldType(item.style || item.sex)}}</el-tag>
              </span>
              <span class="stars">
                <i :class="icon">{{item.amount || item.grade}}</i>
              </span>
            </span>
            <div class="bottom clearfix">
              <time class="time">{{processingDataTimeLength(item.createTime)}}</time>
              <el-tooltip effect="dark" placement="bottom">
                <div slot="content" v-html="processingToolTipContent(item.introduction,45)"></div>
                <el-button type="text" class="button">简介</el-button>
              </el-tooltip>
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
      contentList: {
        type: Array,
        required: true
      },
      icon: {
        type: String,
        required: false
      }
    },  //子组件接收的数据
    data(){
      return{}
    },
    methods:{}
  }
</script>

<style scoped>
@import "../assets/css/content-list.scss";
</style>
