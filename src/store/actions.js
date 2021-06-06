const PLAY_MODEL_LIST = {
  sequence: 0, // 顺序模式
  loop: 1, // 循环
  random: 2, // 随机
}

import {shuffleDom} from '/src/assets/js/utils.js'

const actions = {
  setPlay({commit, state}, {item, index}){
    commit('setPlayState', true);
    commit('setSequenceList', item);
    commit('setPalyList',  item);
    commit('setPlayMode', PLAY_MODEL_LIST.sequence);
    commit('setCurrentIndex', index);
    commit('setFullScreen', true);
  },
  setRandomPlay({commit, state}, item){
    const newItem = shuffleDom(item);
    commit('setPlayState', true);
    commit('setSequenceList', newItem);
    commit('setPalyList',  newItem);
    commit('setPlayMode', PLAY_MODEL_LIST.random);
    commit('setCurrentIndex', 0);
    commit('setFullScreen', true);
  }

}

export default actions