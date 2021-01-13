<template>
    <!--音乐播放公共插件-->
    <div class="song-audio">
        <audio ref="player" :src="url" :controls ="true" :autoplay="false"
               preload="metadata" @canplay="startPlay" @ended="endedPlay"
        ></audio>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'play-audio',
        data() {
            return {
                isPlaying : this.$store.state.isPlay
            }
        },
        computed: {   //加载获取store中的值
            ...mapGetters({
                id: 'id',
                url: 'url',
                isPlay: 'isPlay'
            })
        },
        watch:{
            //监听播放还是暂停
            isPlay: function(){
                this.togglePlay();
            }
        },
        methods:{
            //获取链接后准备播放
            startPlay(){//开始播放
              let playPromise = this.$refs.player.play()
              if (playPromise !== undefined) {
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
            },
            //开始、暂停
            togglePlay() {
                let player = this.$refs.player;
                if(this.isPlay){
                    this.startPlay();   //开始播放音频/视频。
                }else{
                    player.pause();  //暂停当前播放的音频/视频。
                }
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
