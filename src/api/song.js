import request from '@/utils/request';

/*
* 歌曲下载
* */
export default {

  /* 搜索歌曲 */
  downloadSongs (filePath,songName) {
    return request({
      url: `/song/download`,
      method: 'post',
      params:{
        filePath:filePath,
        songName:songName,
      },
      responseType:'blob'
    })
  },


}
