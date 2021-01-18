<template>
    <!--音乐播放公共插件-->
    <div class="song-audio">
        <audio ref="player" :src="url" :controls ="true" :autoplay="false"
               preload="metadata" @canplay="startPlay" @ended="endedPlay"
               @timeupdate="timeUpdate"
        ></audio>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'play-audio',
        data() {
            return {
                isPlaying : this.$store.state.song.isPlay
            }
        },
        computed: {   //加载获取store中的值
            ...mapGetters({
                id: 'id',
                url: 'url',
                isPlay: 'isPlay',
                duration: 'duration',  //音乐时长
                currentTime: 'currentTime',  //当前音乐的播放位置
                changeTime: 'changeTime',  //指定播放时间
                autoNext: 'autoNext',  //用于自动触发播放下一首
                currentIndex: 'currentIndex', //当前歌曲在歌单中的位置
                volume: 'volume'   //音量
            })
        },
        watch:{
            //监听播放还是暂停
            isPlay: function(){
                this.togglePlay();
            },
            //跳转到指定播放时刻
            changeTime(){
              this.$refs.player.currentTime = this.changeTime;
            },
            //改变音量
            volume(val){
              this.$refs.player.volume = val;
            }
        },
        methods:{
            //获取链接后准备播放
            startPlay(){//开始播放
              let playPromise = this.$refs.player.play()
              if (playPromise !== undefined) {
                this.$store.commit('setDuration', this.$refs.player.duration);  //设置的音乐时长
                playPromise.then(() => { // 音频加载成功
                  // 音频的播放需要耗时
                  setInterval(() => {
                    // 后续操作
                    playPromise.play()
                  }, this.$refs.player.duration * 1000); // audio.duration 为音频的时长单位为秒
                }).catch((error)=> {
                  console.log("Operation is too fast, audio play fails:"+error)
                })
              }
            },
            //播放完成之后触发
            endedPlay(){
                this.isPlay = false
                this.$store.commit('setIsPlay',false);
                this.$store.commit('setCurrentTime',0);
                this.$store.commit('setAutoNext',!this.autoNext);
            },
            //开始、暂停
            togglePlay() {
                let player = this.$refs.player;
                if(this.isPlay){
                    this.startPlay();   //开始播放音频/视频。
                }else{
                    player.pause();  //暂停当前播放的音频/视频。
                }
            },

            //音乐播放时记录音乐的播放位置
            timeUpdate(){
              this.$store.commit('setCurrentTime',this.$refs.player.currentTime);
            }
        }
    };
</script>

<style>
    /*不显示默认播放器样式*/
    .song-audio {
        display: inline;
    }
</style>
