<template>
  <!--轮播图组件-->
  <div class="swiper">
    <el-carousel :interval="4000" type="card"  height="300px">
      <el-carousel-item v-for="(item,index) in swiperList" :key="index" :title="item.title">
        <el-image :src="baseURL+item.imageUrl" alt="image not found!" @click="goPage(item.linkUrl)"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  import Index from '@/api/index'
export default {
  name: 'Swapper',
  created () {
    this.getSwipers();
  },
  data(){
    return {
      // 图片列表swipe
      swiperList : [],
      baseURL: this.$store.state.common.HOST
    }
  },
  methods:{
    getSwipers(){
      Index.getIndexSwiper().then(result => {
        if (result && result.code === 200){
          this.swiperList = result.data.data;
        }
      })
    },
    goPage(url){
      //todo 点击封面进行跳转
      console.log(url)
    }
  }
}
</script>

<style scoped>
@import '../assets/css/swiper.scss';
</style>
