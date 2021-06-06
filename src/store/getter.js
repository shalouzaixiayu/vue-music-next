const getters = {
  currentSong(state){
    return state.playlist[state.currentIndex]
  },
}




export default getters