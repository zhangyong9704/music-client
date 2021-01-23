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
          <el-button type="primary" @click="handleLoginIn"
                     element-loading-text="正在跳转中..."
                     element-loading-spinner="el-icon-loading"
                     element-loading-background="rgba(0, 0, 0, 0.8)"
                     v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
          <el-button @click="goSignUp">注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Login from '../../api/login'
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
        },
        fullscreenLoading:false
      }
    },
    methods:{
      //处理登录
      handleLoginIn(){
        this.fullscreenLoading = true
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            Login.loginInDiMon(this.loginForm).then((response) =>{
              if (response.code === 200){
                localStorage.setItem(this.$store.state.common.storageConst,this.loginForm.username);
                setTimeout(() => {
                  this.fullscreenLoading = false;
                  this.$router.push('/');   //跳转到主页路径
                  this.$message.success('登录成功');
                }, 1000);
              }else{
                this.$message.warning(response.message);
              }
            }).catch(error =>{
              this.loginForm = {};
              this.$message.warning('登录失败，请重试！');
              return false
            })
          } else {
            this.$message.error('请输入账号和密码');
            return false;
          }
        });
      },

      //跳转到注册
      goSignUp(){
        // this.changeIndex('注册');
        this.$router.push({path: '/register'});
      },

      //变更注册图标选中状态
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
