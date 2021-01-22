<template>
  <div>
    <div class="login-logo">
      <svg class="icon">
        <use xlink:href="#icon-erji"></use>
      </svg>
    </div>
    <div class="signUp" style="top:220px">
      <div class="signUp-head">
        <span>登录DiMon</span>
      </div>
      <el-form :model="loginForm" ref="loginForm" label-width="70px" class="demo-ruleForm" :rules="rules">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
        </el-form-item>

        <div class="login-btn">
          <el-button @click="goSignUp">注册</el-button>
          <el-button type="primary" @click="handleLoginIn">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        loginForm: {
          username: '',       //用户名
          password: '',       //密码
        },
        rules: {
          username: [{ required: true, trigger: 'blur',message: '请输入用户名' }],
          password: [{ required: true, trigger: 'blur',message: '请输入密码' }]
        }
      }
    },
    methods:{
      handleLoginIn(){},

      goSignUp(){
        // this.changeIndex('注册');
        // this.$router.push({path: '/sign-up'});
      },
      changeIndex(value){
        this.$store.commit('setActiveName',value);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/login-logo.scss';
  @import '../../assets/css/sign-up.scss';
</style>
