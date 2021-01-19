<template>
  <div id="app">
    <the-header></the-header>
    <router-view class="music-content"/>
    <scroll-top></scroll-top>
    <play-bar></play-bar>
    <the-footer></the-footer>
  </div>
</template>

<script>
  import TheHeader from './components/TheHeader'
  import TheFooter from './components/TheFooter'
  import ScrollTop from './components/ScrollTop'
  import TheAside from './components/TheAside'
  import PlayBar from './components/PlayBar'

  export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
    ScrollTop,
    PlayBar
  }
}
</script>

<style  lang="scss" scoped>
@import "./assets/css/app.scss";
</style>
