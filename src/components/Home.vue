<template>
  <div class="wrapper">
    <the-header/>
    <div class="home">
      <swiper></swiper>
    </div>
  </div>
</template>

<script>
  import Swiper from './Swiper'
  import TheHeader from './TheHeader'

export default {
  name: 'home',
  components: {
    Swiper,
    TheHeader
  },
  data () {
    return {

    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/home';
</style>
