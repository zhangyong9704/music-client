import request from '@/utils/request';

/*
* 登录控制器
* */
export default {

  /* 登录系统 */
  loginInDiMon (consumer) {
    return request({
      url: `login-front/consumer-login`,
      method: 'post',
      data:consumer
    })
  },


}
