<template>
    <div class="search-songs">
        <div class="content">
          <h1 class="title">
            <slot name="title"></slot>
            <hr/>
          </h1>
          <ul>
            <li>
              <div class="song-item">
                <span class="item-index"></span>
                <span class="item-title">歌曲名</span>
                <span class="item-name">歌手</span>
                <span class="item-intro">专辑</span>
              </div>
            </li>
            <li v-for="(item,index) in songsList" :key="index">
              <div class="song-item" >
                     <span class="item-index">
                         {{index + 1}}
                     </span>
                <span class="item-title">{{replaceFName(item.name)}}</span>
                <span class="item-name">{{replaceLName(item.name)}}</span>
                <span class="item-intro">{{item.introduction}}</span>
              </div>
            </li>
          </ul>
        </div>
    </div>
</template>

<script>
  import Search from '../../../api/search'

  export default {
    name: 'search-songs',
    props:{
      keyword:{
        type:String,
        required:true
      }
    },
    data () {
      return {
        query: {   //分页信息
          pageIndex: 1,
          pageSize: 8,
        },
        pageTotal:-1,
        songsList:[],
        indexList: [
          {name:"歌单",list: [],icon: 'el-icon-s-data'},
          {name:"歌手",list: [],icon: 'el-icon-star-off'}
        ],
      }
    },
    created () {
      this.fetchData();
    },
    methods:{

      // 获取数据
      fetchData() {
        Search.searchSongs(this.query,this.keyword).then(result => {
          if (result && result.code === 200){
            this.songsList = result.data.data;
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
  @import "../../../assets/css/search-songs";
  @import "../../../assets/css/album-content";
</style>
