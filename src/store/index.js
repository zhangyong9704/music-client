import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        HOST: 'http://127.0.0.1:8088',
        UPLOAD_SINGER_COVER: 'http://localhost:8088/singer/upload-cover',  //歌手封面上传路径
        UPLOAD_SONGS_URL: 'http://localhost:8088/song/upload-file',  //歌曲文件上传路径
        UPLOAD_SONGS_COVER: 'http://localhost:8088/song/upload-cover',  //歌曲文件封面路径
        UPLOAD_SONG_LIST_COVER: 'http://localhost:8088/song-list/upload-cover',  //歌单文件封面路径
        UPLOAD_BANNER_COVER: 'http://localhost:8088/banner/upload-cover',  //歌单文件封面路径

        url:'',  //歌曲播放地址
        id:'',  //歌曲id
        isPlay: false, //是否播放歌曲
        playStateIcon: '#icon-bofang',   //播放状态的图标
        playItemIcon:'fa fa-play-circle-o fa-lg play-stop', //未播放的默认图标(歌单列表后的小图标)
        playingIndex: -1,  //搜索歌单点击小图标的歌曲下标值

    },
    mutations: {   //设置设值方式
        setIsPlay(state,isPlay){
            this.state.isPlay = isPlay
        },
        setUrl(state, url){
            this.state.url = url
        },
        setId(state, id){
            this.state.id = id
        },
        setPlayStateIcon(state,playStateIcon){
          this.state.playStateIcon = playStateIcon
        },
        setPlayItemIcon(state,playItemIcon){
          this.state.playItemIcon = playItemIcon
        },
        setPlayingIndex(state,playingIndex){
          this.state.playingIndex = playingIndex
        },
    },
    getters: {   //设置获取方式
        isPlay:(state) => state.isPlay || null,
        url:(state) =>state.url || null,
        id:(state)=>state.id||null,
        playStateIcon:(state)=>state.playStateIcon||'#icon-bofang',
        playItemIcon:(state)=>state.playItemIcon||'fa fa-play-circle-o fa-lg play-stop',
        playingIndex:(state)=>state.playingIndex|| -1,  //播放下标
    },
})

export default store;
