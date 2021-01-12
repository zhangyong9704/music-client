<template>
    <div class="search-song-lists">
      <content-list :content-list="songsLists" style="{display: block}"></content-list>
    </div>
</template>

<script>
  import ContentList from '../../../components/ContentList'
  import Search from '../../../api/search'

  export default {
    name: 'search-song-sheets',
    components:{
      ContentList,
    },
    props:{
      keyword:{
        type:String,
        required:true
      }
    },
    data(){
      return{
        query: {   //分页信息
          pageIndex: 1,
          pageSize: 8,
        },
        pageTotal:-1,
        songsLists:[],

      }
    },
    created () {
      this.fetchData();
    },
    methods:{
      // 获取数据
      fetchData() {
        Search.searchSongLists(this.query,this.keyword).then(result => {
          if (result && result.code === 200){
            this.songsLists = result.data.data;
            this.pageTotal = result.data.total || 20;
          }
        }).catch(reason => {
          this.$message.error(reason.message)
        })
      },

    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/css/search-song-sheets";
</style>
