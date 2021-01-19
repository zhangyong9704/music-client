<template>
  <div class="song-lyric">
    <h1 class="lyric-title">{{title}}</h1>
    <!-- 有歌词 -->
    <ul ref="lyricUl" class="has-lyric" v-if="lyric.length" >
      <li v-for="(item,index) of lyric" :key="index">
        {{item[1]}}
      </li>
    </ul>
    <!-- 没有歌词 -->
    <div v-else class="no-lyric" >
      <span>暂无歌词</span>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'lyric',
    data(){
      return {
        lyric: [],         //当前歌曲的歌词
        title:'',
        lineNo: 0, //当前行
        C_pos: 10, //C位
        offset: -40, //滚动距离（应等于行高）
      }
    },
    computed : {
      ...mapGetters({
        isPlay: 'isPlay',
        playSongsInfo: 'playSongsInfo',  //播放歌曲的单曲信息
        currentTime: 'currentTime',  //当前音乐的播放位置
        playingIndex: 'playingIndex',  //正在播放歌曲的下标值
        playSongsList:'playSongsList',  //所有歌曲列表
      })
    },
    created () {
      if (this.analysisOfLyrics(this.playSongsList[this.playingIndex-1].lyric)){
        this.lyric = this.analysisOfLyrics(this.playSongsList[this.playingIndex-1].lyric)  //获得解析后的歌词
        this.title = this.playSongsList[this.playingIndex-1].name
      }else{
        this.lyric = this.analysisOfLyrics(this.playSongsInfo.lyric)  //获得解析后的歌词
        this.title = this.playSongsInfo.name
      }
      this.$store.commit('setIsPlay',true);
    },
    watch:{
      currentTime(){   //监听播放进度值
        this.scrollAndHigh()
      }
    },
    methods: {
      // let audio = document.getElementById("audio"),//播放器
      // let ul = document.getElementById("lyric"), //歌词容器列表

      scrollAndHigh(){
        if(this.lyric.length>0){
          for(let i=0;i<this.lyric.length;i++){
            if(this.currentTime>=this.lyric[i][0]){    //当前匹配时间于数组时间一致
              for(let j=0;j<this.lyric.length;j++){    //所有未选中的样式
                document.querySelectorAll('.has-lyric li')[j].style.color = '#000';
                document.querySelectorAll('.has-lyric li')[j].style.fontSize = '15px';
              }
              if(i>=0){  //当前选中的行
                if (i>this.C_pos){  //当前li向上偏移
                  this.$refs.lyricUl.style.transform = "translateY("+(i-this.C_pos)*this.offset+"px)";  //整体向上滚动一行高度
                  // document.getElementsByTagName("li")[i].style.transform = "translateY("+(i-this.C_pos)*this.offset+"px)";
                  document.querySelectorAll('.has-lyric li')[i].style.color = '#95d2f6';
                  document.querySelectorAll('.has-lyric li')[i].style.fontSize = '25px';
                }else{
                  document.querySelectorAll('.has-lyric li')[i].style.color = '#95d2f6';
                  document.querySelectorAll('.has-lyric li')[i].style.fontSize = '25px';
                }

              }
            }
          }
        }
      },

  //       //高亮显示歌词当前行及文字滚动控制，行号为lineNo
  //        lineHigh() {
  //         let lis = ul.getElementsByTagName("li");//歌词数组
  //         if(lineNo>0){
  //           lis[lineNo-1].removeAttribute("class");//去掉上一行的高亮样式
  //         }
  //         lis[lineNo].className = "lineHigh";//高亮显示当前行
  //
  //         //文字滚动
  //         if(lineNo>C_pos){
  //           ul.style.transform = "translateY("+(lineNo-C_pos)*offset+"px)"; //整体向上滚动一行高度
  //         }
  //       },
  //
  // //滚回到开头，用于播放结束时
  //        goback() {
  //         document.querySelector("#lyric .lineHigh").removeAttribute("class");
  //         ul.style.transform = "translateY(0)";
  //         lineNo = 0;
  //       },
  //
  // //监听播放器的timeupdate事件，实现文字与音频播放同步
  //       audio.ontimeupdate = function () {
  //         if(lineNo==oLRC.ms.length)
  //           return;
  //         var curTime = audio.currentTime; //播放器时间
  //         if(parseFloat(oLRC.ms[lineNo].t)<=curTime){
  //           lineHigh();//高亮当前行
  //           lineNo++;
  //         }
  //       },
  //
  // //监听播放器的ended事件，播放结束时回滚歌词
  //       audio.onended = function () {
  //         goback(); //回滚歌词
  //       },

    }

  }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/lyric.scss';
</style>
