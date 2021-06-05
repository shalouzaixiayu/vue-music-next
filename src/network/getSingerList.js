import {BaseRequest} from './base.js'

const ERR_OK = 0
const URL_SINGERLIST = "/api/getSingerList"
const URL_SINGERDETAIL = '/api/getSingerDetail'

// 请求歌手列表信息
export async function getSingerList(){
  return BaseRequest({
    url:URL_SINGERLIST,
    method:'GET',
  }).then((res) => {
    if(res.data.code === ERR_OK){
      return res.data.result
    }
  })
}

// 请求歌手详情页
export async function getSingerDetail(mid){
  return BaseRequest({
    url:URL_SINGERDETAIL,
    method:'GET',
    params:{
      mid
    }
  }).then(res => {
    if(res.data.code === ERR_OK){
      return res.data.result
    }
  })
}
