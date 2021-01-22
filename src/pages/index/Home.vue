<template>
  <div class="wrapper">
    <div class="home">
      <swiper></swiper>
        <div class="section" v-for="(item,index) in indexList" :key="index">
          <div class="section-title">{{item.name}}</div>
          <content-list :content-list="item.list" :icon="item.icon"></content-list>
        </div>
    </div>
    <scroll-top></scroll-top>
  </div>
</template>

<script>
  import Swiper from '../../components/Swiper'
  import ContentList from '../../components/ContentList'
  import ScrollTop from '../../components/ScrollTop'
  import Index from '@/api/index'

export default {
  name: 'home',
  components: {
    Swiper,
    ContentList,
    ScrollTop
  },
  data () {
    return {
      indexList: [
        {name:"歌单",list: [],icon: 'el-icon-s-data'},
        {name:"歌手",list: [],icon: 'el-icon-star-off'}
      ],
    }
  },
  created () {
    this.getTopTenSinger();
    this.getTopTenSongList();
  },
  methods: {
    getTopTenSinger(){
      Index.indexTopTenSinger().then((result => {
        if (result && result.code === 200){
          this.indexList[1].list = result.data.data;
        }
      }))
      .catch((reason => {
        this.$message.error(reason.message);
      }))
    },

    getTopTenSongList(){
      Index.indexTopTenSongList().then((result => {
        if (result && result.code === 200){
          this.indexList[0].list = result.data.data;
        }
      }))
        .catch((reason => {
          this.$message.error(reason.message);
      }))

    }

  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/home';
</style>
