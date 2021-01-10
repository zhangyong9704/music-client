import request from '@/utils/request';

/*
* 主页信息查询
* */
export default {

  /* 评论前十的歌手 */
  indexTopTenSinger () {
    return request({
      url: `index-front/top-singer`,
      method: 'get'
    })
  },

  /*评分前十的歌单*/
  indexTopTenSongList () {
    return request({
      url: `index-front/top-songList`,
      method: 'get'
    })
  },

  /*主页swiper展示*/
  getIndexSwiper () {
      return request({
        url: `banner-front/banners`,
        method: 'get'
      })
    },


}
