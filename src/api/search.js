import request from '@/utils/request';

/*
* 主页信息查询
* */
export default {

  /* 搜索歌曲 */
  searchSongs (query,keyword) {
    return request({
      url: `search-front/top-singer/${query.pageIndex}/${query.pageSize}/${keyword}`,
      method: 'get'
    })
  },

  /*搜索歌单*/
  searchSongLists (query,keyword) {
    return request({
      url: `search-front/top-songList/${query.pageIndex}/${query.pageSize}/${keyword}`,
      method: 'get'
    })
  },

}
