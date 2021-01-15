import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        HOST: 'http://127.0.0.1:8088',

        url:'',  //歌曲播放地址
        id:'',  //歌曲id
        isPlay: false, //是否播放歌曲
        playStateIcon: '#icon-bofang',   //播放状态的图标
        playItemIcon:'fa fa-play-circle-o fa-lg play-stop', //未播放的默认图标(歌单列表后的小图标)
        playingIndex: -1,  //搜索歌单点击小图标的歌曲下标值
        playSongsInfo: {}, //点击搜索歌曲传递的信息

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
        setPlaySongsInfo(state,playingIndex){
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
        playSongsInfo:(state)=>state.playSongsInfo|| {},  //点击搜索歌曲传递的信息
    },
})

export default store;
