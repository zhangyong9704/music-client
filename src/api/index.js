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


  /* 获得歌手类型组合 */
  singersCombinationType () {
    return request({
      url: `index/singer_type`,
      method: 'get'
    })
  },

  /* 获得歌单风格比例 */
  songListRegionalDistribution () {
    return request({
      url: `index/song_list_type`,
      method: 'get'
    })
  },

  /* 获得歌单高分榜 */
  songListHighScore () {
    return request({
      url: `index/song_list_score`,
      method: 'get'
    })
  },

  /* 获得用户性别分布 */
  usersGenderDistribution () {
    return request({
      url: `index/user_gender`,
      method: 'get'
    })
  },

  /* 获得用户地区分布 */
  usersRegionalDistribution () {
    return request({
      url: `index/user_region`,
      method: 'get'
    })
  }

}
