const mutations = {
  // 设置播放状态
  setPlayState(state, playLoad){
    state.playing = playLoad;
  },
  // 设置顺序列表
  setSequenceList(state, playLoad){
    state.sequenceList = playLoad;
  },
  // 设置播放列表
  setPalyList(state, playLoad){
    state.playlist = playLoad;
  },
  // 设置播放模式
  setPlayMode(state, playLoad){
    state.palyMode = playLoad;
  },
  // 设置当前歌曲索引值
  setCurrentIndex(state, playLoad){
    state.currentIndex = playLoad;
  },
  // 设置是否全屏模式
  setFullScreen(state, playLoad){
    state.fullScreen = playLoad
  },
}

export default mutations