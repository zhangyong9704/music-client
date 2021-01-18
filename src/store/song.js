const song = {
    state:()=>({
      url:'',  //歌曲播放地址
      id:-1,  //歌曲id
      isPlay: false, //是否播放歌曲
      playStateIcon: '#icon-bofang',   //播放状态的图标
      playItemIcon:'fa fa-play-circle-o fa-lg play-stop', //未播放的默认图标(歌单列表后的小图标)
      playingIndex: -1,  //搜索歌单点击小图标的歌曲下标值
      playSongsInfo: {}, //点击搜索单个歌曲传递的信息
      playSongsList: [], //点击歌曲列表传递的信息
      duration: 0,  //音乐时长
      currentTime:  0,  //当前音乐的播放位置
      changeTime: 0,  //指定播放时间
      autoNext: true,  //用于自动触发播放下一首
      currentIndex: null, //当前歌曲在歌单中的位置
      volume: 50   //音量
    }),
    mutations: {   //设置设值方式
      setIsPlay(state,isPlay){
        state.isPlay = isPlay
      },
      setUrl(state, url){
        state.url = url
      },
      setId(state, id){
        if (state.playSongsInfo.id){
          state.id = state.playSongsInfo.id
        }else{
          state.id = id || -1
        }
      },
      setPlayStateIcon(state,playStateIcon){
        state.playStateIcon = playStateIcon
      },
      setPlayItemIcon(state,playItemIcon){
        state.playItemIcon = playItemIcon
      },
      setPlayingIndex(state,playingIndex){
        state.playingIndex = playingIndex
      },
      setPlaySongsInfo(state,playSongsInfo){
        state.playSongsInfo = playSongsInfo
      },
      setPlaySongsList(state,playSongsList){
        state.playSongsList = playSongsList
      },
      setDuration(state,duration){
        state.duration = duration  //音乐时长
      },
      setCurrentTime(state,currentTime){
        state.currentTime = currentTime //当前音乐的播放位置
      },
      setChangeTime(state,changeTime){
        state.changeTime = changeTime //指定播放时间
      },
      setAutoNext(state,autoNext){
        state.autoNext = autoNext //用于自动触发播放下一首
      },
      setCurrentIndex(state,currentIndex){
        state.currentIndex = currentIndex //当前歌曲在歌单中的位置
      },
      setVolume(state,volume){
        state.volume = volume //音量
      },
    },
    getters: {   //设置获取方式
      isPlay:(state) => state.isPlay || null,
      url:(state) =>state.url || null,
      id:(state)=> state.playSongsInfo.id||null,
      playStateIcon:(state)=>state.playStateIcon||'#icon-bofang',
      playItemIcon:(state)=>state.playItemIcon||'fa fa-play-circle-o fa-lg play-stop',
      playingIndex:(state)=>state.playingIndex|| -1,  //播放下标
      playSongsInfo:(state)=>state.playSongsInfo|| {},  //点击搜索歌曲传递的信息
      playSongsList:(state)=>state.playSongsList|| [],  //点击搜索歌曲传递的信息
      duration:(state)=>state.duration  || 0,  //音乐时长
      currentTime:(state)=>state.currentTime  || 0,  //当前音乐的播放位置
      changeTime: (state)=>state.changeTime  || 0,  //指定播放时间
      autoNext: (state)=>state.autoNext  || true,  //用于自动触发播放下一首
      currentIndex: (state)=>state.currentIndex  || -1, //当前歌曲在歌单中的位置
      volume: (state)=>state.volume  || 20   //音量
    },
}

export default song;
