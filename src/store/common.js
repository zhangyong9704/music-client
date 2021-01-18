const common = {
  state:()=>({
    HOST: 'http://127.0.0.1:8088', //后台访问地址根目录
    activeName: '',                  //当前选中的菜单名
    showAside: false,               //是否显示播放中的歌曲列表
    loginIn: false,                 //用户是否已登录
    isActive: false,                //当前歌曲是否已收藏
  }),
  getters: {
    activeName: state => state.isPlay || false,
    showAside: state => state.showAside || false,
    loginIn: state => state.loginIn || false,
    isActive: state => state.isActive || false,
  },
  mutations: {
    setActiveName: (state,activeName) => {
      state.activeName = activeName
    },
    setShowAside: (state,showAside) => {
      state.showAside = showAside
    },
    setLoginIn: (state,loginIn) => {
      state.loginIn = loginIn
    },
    setIsActive: (state,isActive) => {
      state.isActive = isActive
    }
  }
}

export default common
