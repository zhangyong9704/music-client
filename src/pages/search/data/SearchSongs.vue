<template>
    <div class="search-songs">
        <div class="content">
          <h1 class="title"><slot name="title"></slot></h1>
          <ul>
            <li>
              <div class="song-item">
                <span class="item-index">序号</span>
                <span class="item-title">歌曲名</span>
                <span class="item-name">歌手</span>
                <span class="item-time">时间</span>
                <span class="item-intro">专辑</span>
                <span class="item-love">播放/收藏</span>
              </div>
            </li>
            <li v-for="(item,index) in songsList" :key="index">
              <div class="song-item" >
                     <span class="item-index">
                         {{index + 1}}
                     </span>
                <span class="item-title">{{item.name===''?'':(item.name).split('-')[1]}}</span>
                <span class="item-name">{{item.name===''?'':(item.name).split('-')[0]}}</span>
                <span class="item-time">{{item.createTime==null?"":(item.createTime).substring(0,10)}}</span>
                <span class="item-intro">{{''===item.introduction?'暂无数据':item.introduction}}</span>
                <span class="item-love">
                  <i :class="index===play_index?play_start:play_stop" aria-hidden="true" @click="togglePlay(index,play_flag)"></i>
                  <i :class="index===store_index?store_love:store_before" aria-hidden="true" @click="toggleStore(index,store_flag)"></i>
                </span>
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
        play_stop:'fa fa-play-circle-o fa-lg play-stop', //未播放的默认图标
        play_start:'fa fa-headphones fa-lg play-start',   //正在播放的图标
        play_index:-1,
        play_flag:false,
        store_before:'fa fa-heart-o fa-lg store_before',   //未收藏的图标
        store_love:'fa fa-heart fa-lg store_love',
        store_index:-1,
        store_flag:false,
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



      //播放图标切换
      togglePlay(index,flag){
        this.play_flag = !flag
        if (this.play_flag){
          this.play_index = index
        }else{
          this.play_index = -1
        }

      },

      //收藏图标切换
      toggleStore(index,flag){
        this.store_flag = !flag
        if (this.store_flag){
        this.store_index = index
        }else{
          this.store_index = -1
        }
      },

    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/search-songs";
  @import "../../../assets/css/album-content";
</style>
