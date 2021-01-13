import request from '@/utils/request';

/*
* 主页信息查询
* */
export default {

  /* 评论前十的歌手 */
  indexTopTenSinger () {
    return request({
      url: `index-front/top-singer`,
      method: 'get',
      params:{
        limit: 10
      }
    })
  },

  /*评分前十的歌单*/
  indexTopTenSongList () {
    return request({
      url: `index-front/top-songList`,
      method: 'get',
      params:{
        limit: 10
      }
    })
  },

  /*主页swiper展示*/
  getIndexSwiper () {
      return request({
        url: `banner-front/banners`,
        method: 'get',
        params:{
          size: 5
        }
      })
    },


}
