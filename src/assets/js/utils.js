/**
 * @export 洗牌算法
 * @param {*} source 传入一个原数组 返回一个打乱后的数组
 */
export function shuffleDom(source){
  const arr = [...source]
  for(let i = 0; i < arr.length; i++){
    const j = getMaxInt(i)
    swap(arr, i, j)
  }
  return arr;
}
function swap(arr, i, j){
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
/**
 *
 * @export 返回 0 - max 最大的随机数
 * @param {*} max
 */
function getMaxInt(max){
  return Math.floor((max + 1) * Math.random())
}