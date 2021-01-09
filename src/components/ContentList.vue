<template>
  <!--主页歌单、歌曲的布局样式-->
  <div class="content-list">
    <ul class="section-content">
      <li class="content-item" v-for="(item,index) in contentList" :key="index">
<!--        <div class="kuo" >-->
<!--          <img class="item-img" src="../assets/img/43.jpg" alt="">-->
<!--          <div class="mask">-->
<!--            <svg class="icon">-->
<!--              <use xlink:href="#icon-bofang"></use>-->
<!--            </svg>-->
<!--          </div>-->
<!--        </div>-->
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
              <time class="time">{{(null===item.createTime)?item.createTime:(item.createTime).substring(0,10)}}</time>
              <el-tooltip effect="dark" placement="bottom">
                <div slot="content">{{content}}</div>
                <el-button type="text" class="button">操作按钮</el-button>
              </el-tooltip>
            </div>
          </div>
        </el-card>
      </li>
    </ul>
  </div>
</template>

<script>
  import {getSexType} from '../mixins/mixins'

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
      return{
        content: '张国荣是一位在全球华人社会和亚洲地区具有影响力的著名歌手、演员和音乐人；大中华区乐坛和影坛巨星；演艺圈多栖发展<br/>最成功的代表之一。张国荣是香港乐坛的殿堂级歌手之一，曾获得香港乐坛最高荣誉金针奖；他是第一位享誉韩国乐坛的华人<br/>',
      }
    },
    created () {
    },
    methods:{

      //处理歌单、歌手标题过长问题
      processingFieldLength(title){
        return title?title.length<=10?title:title.substring(0,7)+"...":title;
      },

      //处理歌单、歌手类型、组合、性别问题
      processingFieldType(title){
        if (typeof title ==='number' || title==='0'){
          title =  getSexType(title);
          return title
        }else{
          return title
        }
      },


      //处理详情介绍自动换行问题
      processingToolTipContent(title){
        let result ='';
        if (title){
          if (title.length<=55){
            return title;
          }else{
            for (let i = 0; i < Math.ceil(title.length/55); i++) {
              let temp = title.substring(i*55,(i+1)*55);
              result +=temp + '<br/>';
            }
            console.log(result)
            return result
          }
        }else {
          return "正在努力整理中..."
        }
      },

      getFieldLength(field){
        return (field || field ==='')?0:field.length
      },

      getImageURL(URL){
        if (URL || URL!=='' || URL ==null){
          return 'http://127.0.0.1:8088'+URL;
        }else{
          return 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        }
      }

    }
  }
</script>

<style scoped>
@import "../assets/css/content-list.scss";
</style>
