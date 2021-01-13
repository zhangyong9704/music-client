import {mapGetters} from 'vuex';

const mixin = {
  // computed: {
  //   ...mapGetters([
  //     'loginIn',              //用户是否已登录
  //     'userId',               //当前登录用户的id
  //   ])
  // },
  methods: {
    //提示信息
    notify(title,type) {
      this.$notify({
        title: title,
        type: type
      })
    },

    //获取图片地址
    attachImageUrl (srcUrl) {
      return srcUrl? this.$store.state.configure.HOST+srcUrl : this.$store.state.configure.HOST+'/img/user.jpg';
    },
    //根据歌手名字模糊查询歌曲
    getSong() {
      if(!this.$route.query.keywords){
        this.$store.commit('setListOfSongs',[]);
        this.notify('您输入的内容为空','warning');
      }else{
        likeSongOfName(this.$route.query.keywords).then(res => {
          if(!res.length){
            this.$store.commit('setListOfSongs',[]);
            this.notify('系统暂无符合条件的歌曲','warning');
          }else{
            this.$store.commit('setListOfSongs',res);
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },

    //播放
    toPlay: function(id,url,pic,index,name,lyric){
      this.$store.commit('setId',id);
      this.$store.commit('setUrl',this.$store.state.configure.HOST+url);
      this.$store.commit('setPicUrl',this.$store.state.configure.HOST+pic);
      this.$store.commit('setListIndex',index);
      this.$store.commit('setTitle',this.replaceFName(name));
      this.$store.commit('setArtist',this.replaceLName(name));
      this.$store.commit('setLyric',this.parseLyric(lyric));
      this.$store.commit('setIsActive',false);
      if(this.loginIn){
        getCollectOfUserId(this.userId)
          .then(res =>{
            for(let item of res){
              if(item.songId == id){
                this.$store.commit('setIsActive',true);
                break;
              }
            }
          })
      }
    },
    //解析歌词
    parseLyric(text){
      let lines = text.split("\n");                   //将歌词按行分解成数组
      let pattern = /\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g; //时间格式的正则表达式
      let result = [];                                //返回值
      //对于歌词格式不对的直接返回
      if(!(/\[.+\]/.test(text))){
        return [[0,text]]
      }
      //去掉前面格式不正确的行
      while(!pattern.test(lines[0])){
        lines = lines.slice(1);
      }
      //遍历每一行，形成一个每行带着俩元素的数组，第一个元素是以秒为计算单位的时间，第二个元素是歌词
      for(let item of lines){
        let time = item.match(pattern);  //存前面的时间段
        let value = item.replace(pattern,'');//存后面的歌词
        for(let item1 of time){
          let t = item1.slice(1,-1).split(":");   //取出时间，换算成数组
          if(value!=''){
            result.push([parseInt(t[0],10)*60 + parseFloat(t[1]),value]);
          }
        }
      }
      //按照第一个元素--时间--排序
      result.sort(function(a,b){
        return a[0] - b[0];
      });
      return result;
    },
    //获取生日
    attachBirth(val){
      return val.substr(0,10);
    },
/*==================================================================================*/
    //判断性别类型
    getSexType(sex) {
      let str ='';
      switch (sex) {
        case 0:
          str='女'
          break;
        case 1:
          str="男"
          break;
        case 2:
          str="组合"
          break;
        case 3:
          str="未知"
          break;
        default:
          str="未知"
      }
      return str;
    },

    //获取图片地址
    getImageURL(URL){
      if (URL || URL!=='' || URL ==null){
        return 'http://127.0.0.1:8088'+URL;
      }else{
        return 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
      }
    },

    //处理详情介绍自动换行问题
    processingToolTipContent(title,targetLength){
      let result ='';
      if (title){
        if (title.length<=targetLength){
          return title;
        }else{
          for (let i = 0; i < Math.ceil(title.length/targetLength); i++) {
            let temp = title.substring(i*targetLength,(i+1)*targetLength);
            result +=temp + '<br/>';
          }
          return result+'<code></code>'
        }
      }else {
        return "正在努力整理中..."
      }
    },

    //处理歌单、歌手类型、组合、性别问题
    processingFieldType(title){
      if (typeof title ==='number' || title==='0'){
        title =  this.getSexType(title);
        return title
      }else{
        return title
      }
    },

    //处理歌单、歌手标题过长问题
    processingFieldLength(title){
      return ''===title?'暂无数据':title.length<=10?title:title.substring(0,7)+"...";
    },

    //处理日期时间过长问题
    processingDataTimeLength(time){
      return (null===time||''===time)?'':time.substring(0,10);
    },

    //处理日期时间过长问题
    processingIntroduction(content){
      return ''===content?'暂无数据':content;
    },

    //获取名字前半部分--歌手名
    replaceLName(singerName){
      return singerName===''?'':singerName.split('-')[0];
    },
    //获取名字后半部分--歌名
    replaceFName(songName){
      return songName===''?'':songName.split('-')[1];
    },

    // 将base64的图片转换为file文件
    convertBase64UrlToBlob(urlData) {
      let bytes = window.atob(urlData.split(',')[1]);//去掉url的头，并转换为byte
      //处理异常,将ascii码小于0的转换为大于0
      let ab = new ArrayBuffer(bytes.length);
      let ia = new Uint8Array(ab);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], { type: 'image/jpeg' });
    },

    //上传图片之前的校验
    beforeUpload(file){
      const isJPG = (file.type === 'image/jpeg')||(file.type === 'image/png');
      if(!isJPG){
        this.$message.error('上传音乐文件只能是MP3格式');
        return false;
      }
      const isLt5M = (file.size / 1024 /1024) < 5;
      if(!isLt5M){
        this.$message.error('上传音乐文件大小不能超过5MB');
        return false;
      }
      return true;
    },

    //上传图片之前的校验
    beforeUploadIsTypeFile(file){
      const isMp3 = (file.type === 'mp3')||(file.type === 'mp3');
      if(!isMp3){
        this.$message.error('上传头像图片只能是jpg或png格式');
        return false;
      }
      const isLt2M = (file.size / 1024 /1024) < 2;
      if(!isLt2M){
        this.$message.error('上传头像图片大小不能超过2MB');
        return false;
      }
      return true;
    },


  }
}

export default mixin;


