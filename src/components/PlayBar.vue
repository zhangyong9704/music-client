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
        <img :src="getImageURL(playSongsInfo.pic)" alt=""/>
      </div>
      <!-- 播放进度 -->
      <div class="playing-speed">
        <!-- 播放开始时间 -->
        <div class="current-time">{{nowTime}}</div>
        <div class="progress-box">
          <div class="item-song-title">
            <div>{{replaceLName(playSongsInfo.name)}}</div>
            <div>{{replaceFName(playSongsInfo.name)}}</div>
          </div>
          <div ref="progress" class="progress" @mousemove="mouseMove" >
            <!-- 进度条 -->
            <div ref="bg" class="bg" @click="clickMove" >
              <div ref="currentProgress" class="cur-progress" :style="{width:currentPoint+'%'}"></div>
            </div>
            <!-- 拖动的进度点 -->
            <div ref="spot" class="spot" :style="{left:currentPoint+'%'}"  @mousedown="mouseDown" @mouseup="mouseUp"></div>
          </div>
        </div>
        <!-- 播放结束时间 -->
        <div class="left-time">{{songTotalTime}} </div>
        <!-- 音量 -->
        <div class="item item-volume" @click="isShowVolume=!isShowVolume">
          <svg v-if="volume===0"  class="icon">
            <use xlink:href="#icon-yinliangjingyinheix"></use>
          </svg>
          <svg v-else class="icon">
            <use xlink:href="#icon-yinliang1"></use>
          </svg>
          <el-slider class="volume" :class="{displayVolume:isShowVolume}" v-model="volume" :vertical="true" ></el-slider>
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
    computed : {
      ...mapGetters({
        isPlay: 'isPlay',
        playStateIcon: 'playStateIcon',   //播放状态的图标
        playSongsInfo: 'playSongsInfo',  //播放歌曲的单曲信息
        duration: 'duration',  //音乐时长
        currentTime: 'currentTime',  //当前音乐的播放位置
        changeTime: 'changeTime',  //指定播放时间
        autoNext: 'autoNext',  //用于自动触发播放下一首
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
      currentTime(){
        this.nowTime = this.formatSongsTime(this.currentTime);   //当前歌曲播放的时间
        this.songTotalTime = this.formatSongsTime(this.duration);     //当前歌曲总时长
        this.currentPoint = (this.currentTime / this.duration) * 100;
      },
      volume(){  //监听音量变化
        this.$store.commit('setVolume', this.volume/100);
      }
    },
    data () {
      return {
        toggle: true,            //显示隐藏播放器页面
        nowTime: '00:00',        //当前播放进度的时间
        songTotalTime: '00:00',       //当前歌曲总时间
        currentPoint: 0,         //进度条原点的位置
        progressLength: 0,       //进度条的总长度
        mouseStartX:    0,       //鼠标拖拽开始位置
        isDrag: false,           //拖拽开始结束的标志，当开始拖拽，它的值才会变成true
        volume: 20,             //音量，默认20
        isShowVolume: false,
      }
    },
    mounted () {
      this.progressLength = this.$refs.progress.getBoundingClientRect().width;  //获取当前设置进度条的宽度
      //音量显示开始
      document.querySelector('.item-volume').addEventListener('click',function(e){
        e.stopPropagation();
      },false);
      document.addEventListener('click',function(){   //点击页面其他地方，音量消失
        document.querySelector('.volume').classList.remove('displayVolume');
      },false);
      //音量显示结束
    },
    methods: {

        //控制播放
        togglePlayBar () {
          if (this.isPlay){
            this.$store.commit('setIsPlay',false);
            console.log(this.$store.getter.song.isPlay)
            this.$store.commit('setPlayStateIcon', '#icon-bofang');
          }else{
            this.$store.commit('setIsPlay',true);
            this.$store.commit('setPlayStateIcon', '#icon-zanting');
          }
        },

        //解析时间(秒之后的值不保留)
        formatSongsTime(value){
          if (!value){
            return  null;
          }
          let theTime = parseInt(value);   //先转换成整型格式
          let result = '';    //返回值
          let hour = Math.floor(theTime / 3600);    //小时
          let minute = Math.floor((theTime / 60) % 60); //分钟
          let second = Math.floor(theTime % 60);        //秒
          if(hour > 0){
            result = hour < 10?('0' + hour + ":"):(hour + ":");
          }
          if(minute > 0){
            if(minute < 10){
              result += "0" + minute + ":";
            }else{
              result += minute + ":";
            }
          }else{
            result += "00:";
          }
          if(second > 0){
            if(second < 10){
              result += "0" + second;
            }else{
              result += second;
            }
          }else{result += "00";
          }
          return result;
        },
        //鼠标点下，拖拽开始
        mouseDown(event){
          this.mouseStartX = event.clientX;   //赋值当前点击的位置
          this.isDrag = true;
        },
        //鼠标松开，拖拽结束
        mouseUp(){
          this.isDrag = false;
        },
        //鼠标拖拽中
        mouseMove(event) {
          if (!this.duration) {   //判断当前是否有歌曲在播放
            return false;
          }
          if (this.isDrag) {
            let movementX = event.clientX - this.mouseStartX;       //鼠标拖动的距离
            let currentProgress = this.$refs.currentProgress.getBoundingClientRect().width;  //当前进度条的位置
            let newProgress = ((movementX + currentProgress) / this.progressLength) * 100;  //拖动后新的进度条的位置
            if (newProgress >=100) {  newProgress = 100;  }
            this.currentPoint = newProgress;
            this.mouseStartX = event.clientX;
            this.changeSongPlayTime(newProgress);
          }
        },
        //点击播放条切换播放进度
        clickMove(event){
          if(!this.isDrag){
            let curLength = this.$refs.bg.offsetLeft; //进度条的左侧坐标(相对于浏览器左侧)
            let newPercent = ((event.clientX - curLength) / this.progressLength) * 100;
            if(newPercent>100){
              newPercent = 100;
            }else if(newPercent<0){
              newPercent = 0;
            }
            this.currentPoint = newPercent;
            this.changeSongPlayTime(newPercent);
          }
        },

        //更改歌曲进度
        changeSongPlayTime(percent){  //percent*0.01  算的是当前播放位置占总播放条的百分比，乘以歌曲总长度=播放歌曲的百分比时间位置
          this.$store.commit('setChangeTime',(percent*0.01)* this.duration);
        },

      }
  }
</script>

<style lang="scss" scoped>
@import '../assets/css/play-bar';
</style>
