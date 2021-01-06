<template>
  <!--轮播图组件-->
  <div class="swiper">
    <el-carousel :interval="4000" type="card"  height="300px">
      <el-carousel-item v-for="(item,index) in swiperList" :key="index">
        <el-image :src="item.path" alt="image not found!"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'Swapper',
  data(){
    return {
      // 图片列表swipe
      swiperList : [
        {path: require('../assets/img/swiper/1.jpg')},
        {path: require('../assets/img/swiper/2.jpg')},
        {path: require('../assets/img/swiper/3.jpg')},
        {path: require('../assets/img/swiper/4.jpg')},
        {path: require('../assets/img/swiper/5.jpg')},
        {path: require('../assets/img/swiper/6.jpg')},
        {path: require('../assets/img/swiper/7.jpg')},
        {path: require('../assets/img/swiper/8.jpg')}
      ],
    }
  },
}
</script>

<style scoped>
@import '../assets/css/swiper.scss';
</style>
