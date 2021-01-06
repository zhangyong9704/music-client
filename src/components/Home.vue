<template>
  <div class="wrapper">
    <the-header></the-header>
    <div class="home">
      <swiper></swiper>
    </div>
    <the-footer></the-footer>
  </div>
</template>

<script>
  import Swiper from './Swiper'
  import TheHeader from './TheHeader'
  import TheFooter from './TheFooter'

export default {
  name: 'home',
  components: {
    Swiper,
    TheHeader,
    TheFooter
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
