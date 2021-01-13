<template>
    <div class="search-song-lists">
      <ul class="section-content">
        <li class="content-item" v-for="(item,index) in songsLists" :key="index">
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
                <i class="el-icon-s-data">{{item.grade}}</i>
              </span>
            </span>
              <div class="bottom clearfix">
                <time class="time">{{(null===item.createTime)?'':(item.createTime).substring(0,10)}}</time>
                <el-tooltip effect="dark" placement="bottom">
                  <div slot="content" v-html="processingToolTipContent(item.introduction,45)"></div>
                  <el-button type="text" class="button">简介</el-button>
                </el-tooltip>
              </div>
            </div>
          </el-card>
        </li>
      </ul>
      <content-list :content-list="songsLists" style="{display: block}"></content-list>
    </div>
</template>

<script>
  import ContentList from '../../../components/ContentList'
  import Search from '../../../api/search'

  export default {
    name: 'search-song-sheets',
    components:{
      ContentList,
    },
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
      }

    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/search-song-sheets";
</style>
