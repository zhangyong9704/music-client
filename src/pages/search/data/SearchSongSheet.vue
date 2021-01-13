<template>
    <div class="search-song-lists">
      <div class="sheet-section-content">
        <div class="sheet-content-item" v-for="(item,index) of songsLists" :key="index">
          <el-card :body-style="{ padding: '1px'}">
            <img :src="getImageURL(item.pic)" class="sheet-item-img" alt="暂无图片">
            <div class="sheet-mask">
              <svg class="sheet-icon">
                <use xlink:href="#icon-bofang"></use>
              </svg>
            </div>
            <div style="padding: 14px;" class="sheet-clearfix">
            <span>
              <el-tooltip placement="top">
                <div slot="content">{{item.title}}</div>

                <el-link type="danger" icon="el-icon-headset">
                  {{''===item.title?'暂无数据':item.title.length<=10?item.title:item.title.substring(0,7)+"..."}}
                </el-link>
              </el-tooltip>
              <span>
                <el-tag size="mini" type="success">{{item.style}}</el-tag>
              </span>
              <span class="sheet-stars">
                <i class="el-icon-s-data">{{item.grade}}</i>
              </span>
            </span>
              <div class="sheet-bottom clearfix">
                <time class="sheet-time">{{(null===item.createTime)?'':(item.createTime).substring(0,10)}}</time>
                <el-tooltip effect="dark" placement="sheet-bottom">
                  <div slot="content" v-html="processingToolTipContent(item.introduction,45)"></div>
                  <el-button type="text" class="sheet-bottom">简介</el-button>
                </el-tooltip>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
</template>

<script>
  import Search from '../../../api/search'

  export default {
    name: 'search-song-sheets',
    props:{
      keyword:{
        type:String,
        required:true
      }
    },
    data(){
      return{
        query: {   //分页信息
          pageIndex: 1,
          pageSize: 8,
        },
        pageTotal:-1,
        songsLists:[],

      }
    },
    created () {
      this.fetchData();
    },
    methods:{
      // 获取数据
      fetchData() {
        Search.searchSongLists(this.query,this.keyword).then(result => {
          if (result && result.code === 200){
            this.songsLists = result.data.data;
            this.pageTotal = result.data.total || 20;
          }
        }).catch(reason => {
          this.$message.error(reason.message)
        })
      },

      getImageURL(URL){
        if (URL || URL!=='' || URL ==null){
          return 'http://127.0.0.1:8088'+URL;
        }else{
          return 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        }
      },

      //处理详情介绍自动换行问题
      processingToolTipContent(title,targetLength){
        let result ='';
        if (title){
          if (title.length<=targetLength){
            return title;
          }else{
            for (let i = 0; i < Math.ceil(title.length/targetLength); i++) {
              let temp = title.substring(i*targetLength,(i+1)*targetLength);
              result +=temp + '<br/>';
            }
            return result+'<code></code>'
          }
        }else {
          return "正在努力整理中..."
        }
      },

    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/search-song-sheets";
</style>
