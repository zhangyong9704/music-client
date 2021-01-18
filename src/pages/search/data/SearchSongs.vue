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
                <span class="item-title">{{replaceFName(item.name)}}</span>
                <span class="item-name">{{replaceLName(item.name)}}</span>
                <span class="item-time">{{processingDataTimeLength(item.createTime)}}</span>
                <span class="item-intro">{{processingIntroduction(item.introduction)}}</span>
                <span class="item-love">
                  <i :class="index===play_index?play_start:play_stop" aria-hidden="true" @click="togglePlay(item,index)"></i>
                  <i :class="index===store_index?store_love:store_before" aria-hidden="true" @click="toggleStore(index,store_flag)"></i>
                </span>
              </div>
            </li>
          </ul>
        </div>
      <play-audio></play-audio>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Search from '../../../api/search'
  import PlayAudio from '../../../components/PlayAudio'
  import PlayBar from '../../../components/PlayBar'

  export default {
    name: 'search-songs',
    components: {
      PlayBar,
      PlayAudio,
    },
    props:{
      keyword:{
        type:String,
        required:true
      }
    },
    computed :{
      ...mapGetters({
        isPlay:'isPlay',
        playItemIcon:'playItemIcon', //未播放的默认图标(歌单列表后的小图标)
        playingIndex:'playingIndex',    //当前歌曲播放的下标
      }),
    },
    data () {
      return {
        query: {   //分页信息
          pageIndex: 1,
          pageSize: 8,
        },
        pageTotal:-1,
        songsList:[],
        HOST:this.$store.state.common.HOST,  //默认地址
        play_stop:'fa fa-play-circle-o fa-lg play-stop', //未播放的默认图标
        play_start:'fa fa-headphones fa-lg play-start',   //正在播放的图标
        play_index:-1,
        store_before:'fa fa-heart-o fa-lg store_before',   //未收藏的图标
        store_love:'fa fa-heart fa-lg store_love',
        store_index:-1,
        store_flag:false,
      }
    },
    created () {
      this.fetchData();
    },
    watch:{
      isPlay(){   //监听播放按钮图标变化
        if (this.isPlay){   //正在播放
          // this.$store.commit('setPlayStateIcon', '#icon-zanting');
          this.play_index = this.playingIndex-1;   //获取播放下标
        }else{  //未播放
          // this.$store.commit('setPlayStateIcon', '#icon-bofang'); //设置playbar 图标
          this.play_index = -1;
        }
      },
      playingIndex(){  //用于上一首、下一首监听，isplay一直会为true,上面监听不起作用
        if (this.playingIndex!==-1){
          this.play_index = this.playingIndex-1;   //获取播放下标
        }else{
          this.play_index = -1;
        }
      }
    },
    methods:{

      // 获取数据
      fetchData() {
        Search.searchSongs(this.query,this.keyword).then(result => {
          if (result && result.code === 200){
            this.songsList = result.data.data;
            this.pageTotal = result.data.total || 20;
            this.$store.commit("setPlaySongsList",this.songsList)  //默认查询后添加到store,后续浮动列表需要使用
          }
        }).catch(reason => {
          this.$message.error(reason.message)
        })
      },

      //播放图标切换
      togglePlay(item,index){
        if (this.isPlay){  //为true,播放状态，点击后就暂停
          this.$store.commit('setIsPlay',false);
          this.$store.commit('setPlayItemIcon', 'fa fa-play-circle-o fa-lg play-stop');
          this.play_index = -1
        }else{
          this.$store.commit('setUrl',this.HOST + item.url);  //拼接歌曲访问地址
          this.$store.commit('setPlayingIndex', index+1);  //传递当前播放歌曲下标(直接传0,图标不进行变动)
          this.$store.commit('setPlaySongsInfo', item);  //传递当前播放歌曲下标
          this.$store.commit('setIsPlay',false);  //先进行暂停
          this.play_index = index   //激活当前播放的
          this.$store.commit('setIsPlay',true);
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


      //获取链接后准备播放
      startPlay(){//开始播放
        document.querySelector('#player').play();
      },
      //播放完成之后触发
      endedPlay(){
        this.isPlay = false
      },

    },
    //切换页面停止播放
    destroyed() {
      this.$store.commit('setIsPlay',false);
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/search-songs";
  @import "../../../assets/css/album-content";
</style>
