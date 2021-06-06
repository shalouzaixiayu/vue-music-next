const PLAY_MODEL_LIST = {
  sequence: 0, // 顺序模式
  loop: 1, // 循环
  random: 2, // 随机
}

const state = {
  sequenceList: [], // 顺序列表
  playlist: [], //播放列表
  playing: false, // 是否播放
  fullScreen: false, // 是否全屏
  currentIndex: 0, // 当前索引
  palyMode: PLAY_MODEL_LIST.sequence, // 顺序模式
}


export default state