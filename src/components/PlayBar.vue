<template>
  <div class="play-bar" :class="{show:!toggle}">
    <div @click="toggle=!toggle" class="item-up" :class="{turn: toggle}">
      <svg class="icon">
        <use xlink:href="#icon-jiantou-xia-cuxiantiao"></use>
      </svg>
    </div>
    <div class="kongjian">
      <!-- 上一首 -->
      <div class="item" >
        <svg class="icon">
          <use xlink:href="#icon-ziyuanldpi"></use>
        </svg>
      </div>
      <!-- 播放 -->
      <div class="item"  @click="togglePlayBar" >
        <svg class="icon">
          <use :xlink:href="playStateIcon"></use>
        </svg>
      </div>
      <!-- 下一首 -->
      <div class="item" >
        <svg class="icon">
          <use xlink:href="#icon-ziyuanldpi1"></use>
        </svg>
      </div>
      <!-- 歌曲图片 -->
      <div class="item-img" >
        <img />
      </div>
      <!-- 播放进度 -->
      <div class="playing-speed">
        <!-- 播放开始时间 -->
        <div class="current-time">{{nowTime}}</div>
        <div class="progress-box">
          <div class="item-song-title">
            <div></div>
            <div></div>
          </div>
          <div ref="progress" class="progress" >
            <!-- 进度条 -->
            <div ref="bg" class="bg" >
              <div ref="curProgress" class="cur-progress" :style="{width:30+'%'}"></div>
            </div>
            <!-- 拖动的点点 -->
            <div ref="idot" class="idot" ></div>
          </div>
        </div>
        <!-- 播放结束时间 -->
        <div class="left-time">{{songTime}}</div>
        <!-- 音量 -->
        <div class="item item-volume">
          <svg  class="icon">
            <use xlink:href="#icon-yinliangjingyinheix"></use>
          </svg>
<!--          <svg v-else class="icon">-->
<!--            <use xlink:href="#icon-yinliang1"></use>-->
<!--          </svg>-->
          <el-slider class="volume"  ></el-slider>
        </div>
        <!-- 收藏 -->
        <div class="item" >
          <svg  class="icon">
            <use xlink:href="#icon-xihuan-shi"></use>
          </svg>
        </div>
        <!-- 下载 -->
        <div class="item" >
          <svg class="icon">
            <use xlink:href="#icon-xiazai"></use>
          </svg>
        </div>
        <!-- 当前播放的歌曲列表 -->
        <div class="item">
          <svg class="icon">
            <use xlink:href="#icon-liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
      name: 'play-bar',
      created () {
      },
      computed : {
        ...mapGetters({
          isPlay: 'isPlay',
          playStateIcon: 'playStateIcon',   //播放状态的图标
        })
      },
      watch:{
        isPlay(){   //监听播放按钮图标变化
          if (this.isPlay){
            this.$store.commit('setPlayStateIcon', '#icon-zanting');
          }else{
            this.$store.commit('setPlayStateIcon', '#icon-bofang');
          }
        },
      },
      data () {
        return {
          toggle: true,            //显示隐藏播放器页面
          nowTime: '00:00',        //当前播放进度的时间
          songTime: '00:00',        //当前歌曲总时间
        }
      },
      methods: {

        //控制播放
        togglePlayBar () {
          if (this.isPlay){
            this.$store.commit('setIsPlay',false);
            this.$store.commit('setPlayStateIcon', '#icon-bofang');
            this.$store.commit('setPlayItemIcon', 'fa fa-headphones fa-lg play-start');
          }else{
            this.$store.commit('setIsPlay',true);
            this.$store.commit('setPlayStateIcon', '#icon-zanting');
            this.$store.commit('setPlayItemIcon', 'fa fa-play-circle-o fa-lg play-stop');
          }
        }
      }
  }
</script>

<style lang="scss" scoped>
@import '../assets/css/play-bar';
</style>
