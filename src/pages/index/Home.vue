<template>
  <div class="wrapper">
    <the-header></the-header>
    <div class="home">
      <swiper></swiper>
        <div class="section" v-for="(item,index) in indexList" :key="index">
          <div class="section-title">{{item.name}}</div>
          <content-list :content-list="item.list"></content-list>
        </div>
    </div>
    <the-footer></the-footer>
  </div>
</template>

<script>
  import Swiper from '../../components/Swiper'
  import TheHeader from '../../components/TheHeader'
  import TheFooter from '../../components/TheFooter'
  import ContentList from '../../components/ContentList'
  import Index from '@/api/index'

export default {
  name: 'home',
  components: {
    Swiper,
    TheHeader,
    TheFooter,
    ContentList
  },
  data () {
    return {
      indexList: [
        {name:"歌单",list: []},
        {name:"歌手",list: []}
      ],

    }
  },
  created () {
    this.getTopTenSinger();
    this.getTopTenSongList();
  },
  methods: {
    getTopTenSinger(){
      Index.getTopTenSinger().then((result => {
        if (result && result.code === 200){
          this.indexList[0].list = result.data.data;
        }
      }))
      .catch((reason => {
        this.message(reason.message)
      }))
    },

    getTopTenSongList(){
      Index.getTopTenSongList().then((result => {
        if (result && result.code === 200){
          this.indexList[1].list = result.data.data;
        }
      }))
        .catch((reason => {
        this.message(reason.message)
      }))

    }

  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/home';
</style>
