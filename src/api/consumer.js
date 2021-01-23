import request from '@/utils/request';

/*
* 用户注册、修改、编辑保存信息
* */
export default {

  /* 用户注册 */
  registerConsumer (consumer) {
    return request({
      url: `consumer-front/add`,
      method: 'post',
      data:consumer
    })
  },

  /* 根据id查询用户信息 */
  selectConsumerById (id) {
    return request({
      url: `consumer-front/queryConsumer/${id}`,
      method: 'get',
    })
  },

  /* 用户注册 */
  updateConsumer (consumer) {
    return request({
      url: `consumer-front/update`,
      method: 'put',
      data:consumer

    })
  },


  /* 用户注销 */
  deleteConsumer (id) {
    return request({
      url: `consumer-front/update/${id}`,
      method: 'put',
    })
  },

  /* 删除上次用户头像 */
  deletePreviousConsumerCover (filePath) {
    return request({
      url: `consumer-front/delete-upload`,
      method: 'delete',
      params:{
        filePath:filePath
      }
    })
  },


}
