<template>
  <transition name="slide-fade">
    <div id="aside"  class="the-aside" v-if="showAside">
      <h2 class="title">播放列表</h2>
      <ul class="menus">
        <li v-for="(item,index) in asideContentList" :key="index"
            :class="{'is-play':id===item.id}" @click="asideTogglePlay(item,index)">
          {{replaceFName(item.name)}}
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'the-aside',
    computed: {
      ...mapGetters({
        id:'id',                //播放中的音乐id
        playingIndex:'playingIndex',    //当前歌曲播放的下标
        playSongsInfo:'playSongsInfo',  //当前播放歌曲的信息(获取播放中的音乐id)
        showAside: 'showAside',         //是否显示播放中的歌曲列表
        isPlay:'isPlay',
      })
    },
    props:{
      asideContentList: {
        type: Array,
        required: true
      },
    },
    methods:{
      //播放图标切换
      asideTogglePlay(item,index){
        this.$store.commit('setUrl',this.$store.state.common.HOST + item.url);  //拼接歌曲访问地址
        this.$store.commit('setPlayingIndex', index+1,);  //传递当前播放歌曲下标(直接传0,图标不进行变动)
        this.$store.commit('setPlaySongsInfo', item,);  //传递当前播放歌曲信息
        if (this.isPlay){
          this.$store.commit('setPlayItemIcon', 'fa fa-play-circle-o fa-lg play-stop');
          this.$store.commit('setPlayStateIcon', '#icon-bofang');
          this.$store.commit('setIsPlay',false);
        }else{
          this.$store.commit('setPlayStateIcon', '#icon-zanting');
          this.$store.commit('setIsPlay',true,);
        }
      },
    }

  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/the-aside.scss';
</style>
