<template>
  <div>
    <div class="login-logo">
      <svg class="icon">
        <use xlink:href="#icon-erji"></use>
      </svg>
    </div>
    <div class="signUp">
      <div class="signUp-head">
        <span>用户注册</span>
      </div>
      <el-form :model="registerForm" ref="registerForm" label-width="70px" class="demo-ruleForm" :rules="rules">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="registerForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="registerForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别">
          <el-radio-group v-model="registerForm.sex">
            <el-radio :label="0">女</el-radio>
            <el-radio :label="1">男</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="phoneNum" label="手机">
          <el-input v-model="registerForm.phoneNum" placeholder="手机"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="registerForm.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="birth" label="生日">
          <el-date-picker v-model="registerForm.birth" placeholder="选择日期" type="date"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          style="width:100%">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="introduction" label="签名">
          <el-input v-model="registerForm.introduction" placeholder="签名"></el-input>
        </el-form-item>
        <el-form-item prop="location" label="地区">
          <el-select v-model="registerForm.location" placeholder="地区" style="width: 100%;">
            <el-option v-for="item of cities" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <div class="login-btn">
          <el-button @click="goBack(-1)">取消</el-button>
          <el-button type="primary" @click="SignUp" element-loading-text="正在跳转中..."
                     element-loading-spinner="el-icon-loading"
                     element-loading-background="rgba(0, 0, 0, 0.8)"
                     v-loading.fullscreen.lock="fullscreenLoading">确定</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {rules,cities} from '../../assets/data/form'
  import Consumer from '../../api/consumer'
  export default {
    name: 'register',
    data() {
      return {
        registerForm: {},
        cities: [],            //所有的地区--省
        rules: {} ,              //表单提交的规则
        fullscreenLoading:false
      }
    },
    created() {
      this.rules = rules;
      this.cities = cities;
    },
    methods:{
      //注册信息提交
      SignUp(){
        this.fullscreenLoading = true
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            Consumer.registerConsumer(this.registerForm).then((response) =>{
              if (response.code === 200){
                localStorage.setItem(this.$store.state.common.storageConst, this.registerForm.username);
                setTimeout(() => {
                  this.fullscreenLoading = false;
                  this.registerForm = {}
                  this.$router.push('/login');  //跳转到登录界面
                  this.$message.success('注册成功');
                }, 1000);
              }else{
                this.$message.warning(response.message);
                this.registerForm = {}
              }
            }).catch(error =>{
              this.$message.warning('注册失败，请重试！');
              return false
            })
          } else {
            this.$message.error('请输入补全注册信息');
            return false;
          }
        });
      },

      //返回
      goBack(index){
        this.registerForm = "";
        this.$router.go(index);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/login-logo.scss';
  @import '../../assets/css/sign-up.scss';
</style>
