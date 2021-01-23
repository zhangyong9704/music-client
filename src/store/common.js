const common = {
  state:()=>({
    //后台访问地址根目录
    HOST: 'http://127.0.0.1:8088',
    //保存localStorage 统一名称
    storageConst : 'user_info' ,
    //当前选中的菜单名
    activeName: '',
    //是否显示播放中的歌曲列表
    showAside: false,
    //用户是否已登录
    loginIn: false,
    //当前歌曲是否已收藏
    isActive: false,
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
