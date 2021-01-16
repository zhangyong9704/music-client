<template>
  <transition name="slide-fade">
    <div class="the-aside" v-if="showAside">
      <h2 class="title">播放列表</h2>
      <ul class="menus">
        <li>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'the-aside',

  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/the-aside.scss';
</style>
