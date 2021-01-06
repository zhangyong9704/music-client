<template>
  <!--轮播图组件-->
  <div class="swiper">
    <el-carousel :interval="4000" type="card"  height="300px">
      <el-carousel-item v-for="(item,index) of swiperList" :key="index">
        <el-image :src="item.picImg" alt=""/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import {swiperList} from '../assets/data/swiperData'
export default {
  name: 'Swapper',
  data(){
    return {
      swiperList: [] // 图片列表swipe
    }
  },
  created () {
    this.swiperList = swiperList
  },
}
</script>

<style scoped>
@import '../assets/css/swiper.scss';
</style>
