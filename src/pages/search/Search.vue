<template>
  <div>
    <div class="search">
      <nav class="searchList-nav" ref="change">
        <span v-for="(item,index) in titleItemList" :key="index"
              :class="{isActive:index===target}" @click="handleToggle(index,item.tag)">
          <i :class="item.icon"></i>
          {{item.title}}
        </span>
      </nav>
      <keep-alive>
        <component :is="isShow" :keyword="keyword"></component>
      </keep-alive>
    </div>
    <play-bar></play-bar>
  </div>
</template>

<script>
  import SearchSongs from './data/SearchSongs'
  import SearchSongSheet from './data/SearchSongSheet'
  import PlayBar from '../../components/PlayBar'
  export default {
    name: 'search',
    components:{
      SearchSongs,
      SearchSongSheet,
      PlayBar
    },
    created () {
      if (this.$route.query.keyword){
        this.keyword = this.$route.query.keyword;
      }
    },
    data(){
      return{
        keyword: '',
        target: 0,
        isShow:'SearchSongs',
        titleItemList: [
          {title:"歌手", icon: 'el-icon-s-data', tag: 'Songs'},
          {title:"歌曲", icon: 'el-icon-s-data', tag: 'SongSheet'}
        ]
      }
    },
    methods:{
      handleToggle(index,tag){
        this.target = index
        this.isShow = "Search"+tag;
        console.log(this.isShow)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/search.scss';
</style>
