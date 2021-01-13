<template>
    <div class="search-song-lists">
      <div class="sheet-search-keyword"><span>搜索的关键字:
        <el-tag size="small" type="primary" >{{keyword}}</el-tag>
      </span></div>
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
                  {{processingFieldLength(item.title)}}
                </el-link>
              </el-tooltip>
              <span>
                <el-tag size="mini" type="success">{{item.style}}</el-tag>
              </span>
              <span class="sheet-stars">
                <i class="el-icon-s-data">{{item.grade}}</i>
              </span>
            </span>
              <div class="sheet-bottom sheet-clearfix">
                <time class="sheet-time">{{processingDataTimeLength(item.createTime)}}</time>
                <el-tooltip effect="dark" placement="bottom">
                  <div slot="content" v-html="processingToolTipContent(item.introduction,45)"></div>
                  <el-button type="text" class="sheet-button">简介</el-button>
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
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/search-song-sheets";
</style>
