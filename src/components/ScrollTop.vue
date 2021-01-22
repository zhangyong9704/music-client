<template>
  <div>
    <div class="scroll-top"  v-show="navTab" @click="toTop">
      <div class="box-in"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'scroll-top',
    data(){
      return{
        navTab: false,
      }
    },
    mounted () {
      window.addEventListener("scroll", this.handleScroll);
    },
    methods:{
      handleScroll() {      //下拉一定距离后显示
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 350) {
          this.navTab = true;
        } else if (scrollTop < 350) {
          this.navTab = false;
        }
      },
      toTop() {
        window.scrollTo({
          left: 0,
          top: 0,
          behavior: 'smooth'
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/scroll-top.scss';
</style>
