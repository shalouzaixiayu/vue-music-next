import {
  BaseRequest
} from './base.js'
const URL_SONG = '/api/getSongsUrl'

/**
 *
 *
 * @export
 * @param {*} songs 接受歌曲的信息，(不带播放url的信息)
 * @return {返回带有播放URL的歌曲信息}
 */
export async function processSong(songs) {
  if (songs.length === 0) {
    return Promise.resolve(songs)
  }
  return BaseRequest({
    url: URL_SONG,
    method: 'GET',
    params: {
      mid: songs.map(item => {
        return item.mid
      })
    }
  }).then(res => {
    const mp = res.data.result.map
    return songs.map(item => {
      item.url = mp[item.mid]
      return item
    }).filter(item => {
      return item.url.indexOf('vkey') > -1
    })
  })
}