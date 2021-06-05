import {BaseRequest} from  './base.js'
const ERR_OK = 0
const URL_RECOMMENDED = "/api/getRecommend"


export async function getRecommend(){
  return BaseRequest({
    url:URL_RECOMMENDED,
    method:'GET',
  }).then((res) => {
    if(res.data.code === ERR_OK){
      return res.data.result
    }
  })
}