<template>
  <div id="app">
    <the-header></the-header>
    <router-view class="music-content"/>
    <scroll-top></scroll-top>
    <the-footer></the-footer>
  </div>
</template>

<script>
  import TheHeader from './components/TheHeader'
  import TheFooter from './components/TheFooter'
  import ScrollTop from './components/ScrollTop'
  import TheAside from './components/TheAside'

  export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
    ScrollTop
  }
}
</script>

<style  lang="scss" scoped>
@import "./assets/css/app.scss";
</style>
