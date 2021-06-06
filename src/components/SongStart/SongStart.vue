<template>
  <div class="start" v-if="fullScreen">
    <template v-if="currentSong">
      <div class="background">
        <img :src="currentSong.pic" />
      </div>

      <div class="top">
        <div class="back">
          <i class="icon-back" @click="pathBack"></i>
        </div>
        <h1 class="songName">{{ currentSong.name }}</h1>
        <h1 class="singer">{{ currentSong.singer }}</h1>
      </div>
      <!-- 下面的操作区 -->
      <div class="bottom">
        <div class="operators">
          <div class="left">
            <i class="icon-sequence"></i>
          </div>
          <div class="left">
            <i class="icon-prev" @click="toggleSong(-1)"></i>
          </div>
          <div class="center">
            <i :class="centerIcon" @click="togglePlay"></i>
          </div>
          <div class="right">
            <i class="icon-next" @click="toggleSong(1)"></i>
          </div>
          <div class="right">
            <i class="icon-not-favorite"></i>
          </div>
        </div>
      </div>
    </template>
  </div>
  <!-- 音频控件 -->
  <!-- 监听内部的 pause事件， 更新vuex中的播放状态 -->
  <audio ref="aRef" @pause="pause"></audio>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

// 音频ref
const aRef = ref(null);
const store = useStore();
const router = useRouter();
const currentSong = computed(() => store.getters.currentSong);
const fullScreen = computed(() => store.state.fullScreen);
const currentIndex = computed(() => store.state.currentIndex);
const playList = computed(() => store.state.playlist);

const playing = computed(() => store.state.playing);
const centerIcon = computed(() => {
  return playing.value ? "icon-pause" : "icon-play";
});

watch(currentSong, (newVal) => {
  if (!newVal.id || !newVal.url) {
    return;
  }
  const audioEL = aRef.value;
  audioEL.src = newVal.url;
  audioEL.play();
});

// 监听play状态
watch(playing, (newPlaying) => {
  const audioEL = aRef.value;
  newPlaying ? audioEL.play() : audioEL.pause();
});

function togglePlay() {
  store.commit("setPlayState", !playing.value);
}
// 切换歌曲
function toggleSong(i) {
  if (!playing.value) {
    store.commit("setPlayState", true);
  }
  let index = 0;
  const list = playList.value;

  if (list.length === 0) return;
  if (list.length === 1) {
    loop();
    return;
  }
  if (i < 0) {
    // 上一首
    index = currentIndex.value - 1;
    if (index === -1) {
      index = list.length - 1;
    }
  } else {
    // 下一首
    index = currentIndex.value + 1;
    if (index === list.length) {
      index = 0;
    }
  }
  store.commit("setCurrentIndex", index);
}
// 循环模式
function loop() {
  const audioEL = aRef.value;
  audioEL.currentTime = 0;
  audioEL.loop = true;
}
function pause() {
  store.commit("setPlayState", false);
}

// 路由回退
function pathBack() {
  router.go(-1);
  store.commit("setFullScreen", false);
}
</script>

<style lang="scss" scoped>
.start {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  background-color: rgba(34, 34, 34, 0.8);
  .background {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    opacity: 0.6;
    z-index: -1;
    filter: blur(20px);
    img {
      height: 100%;
      width: 100%;
    }
  }
  .top {
    .back {
      width: 40px;
      line-height: 40px;
      margin-left: 10px;
      color: $color-theme;
      i {
        display: inline-block;
        transform: rotate(-90deg);
      }
    }
    .songName {
      position: absolute;
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
      color: $color-theme;
      font-size: $font-size-medium-x;
      letter-spacing: 5px;
    }
    .singer {
      text-align: center;
      color: rgba(221, 202, 202, 0.8);
      font-size: $font-size-medium;
      letter-spacing: 5px;
    }
  }
  .bottom {
    position: absolute;
    left: 0;
    bottom: 15%;
    width: 100%;
    .operators {
      display: flex;
      justify-content: center;
      .left,
      .right,
      .center {
        text-align: center;
        width: 60px;
        height: 60px;
        line-height: 60px;
        font-size: 30px;
        color: $color-theme;
        opacity: 0.8;
      }
      .center {
        font-size: 38px;
        opacity: 1;
      }
    }
  }
}
</style>
