import request from '@/utils/request';

/*
* 主页信息查询
* */
export default {

  /* 搜索歌曲 */
  searchSongs (query,keyword) {
    return request({
      url: `search-front/song-keyword/${query.pageIndex}/${query.pageSize}/${keyword}`,
      method: 'get'
    })
  },

  /*搜索歌单*/
  searchSongLists (query,keyword) {
    return request({
      url: `search-front/song-list-keyword/${query.pageIndex}/${query.pageSize}/${keyword}`,
      method: 'get'
    })
  },

}
