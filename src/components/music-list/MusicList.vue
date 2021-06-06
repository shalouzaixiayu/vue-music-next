<template>
  <div class="detailList" v-if="obj.res.length >= 1">
    <div class="back">
      <span class="music-icon icon-back" @click="back"></span>
      <h2>{{ obj.res[0].singer }}</h2>
    </div>
    <div class="attr" :style="attrStyle.class">
      <div :style="headStyle"></div>
    </div>
    <!-- 随机播放按钮 -->
    <div class="randomClass">
      <div class="content" @click="randomPlay" v-show="obj.res.length >= 1">
        <i class="icon-play"></i>
        <span>随 机 播 放 歌 曲</span>
      </div>
    </div>

    <SongList
      :songList="obj.res"
      @onScroll="onScroll"
      @selectSongItem="selectSongItem"
    ></SongList>
  </div>
</template>

<script setup>
import SongList from "../base/song-list/SongList.vue";
import { useRouter, useRoute } from "vue-router";
import { reactive, watch, computed, onMounted, ref, nextTick } from "vue";
import { getSingerDetail } from "../../network/getSingerList.js";
import { processSong } from "../../network/getSong.js";
import { useStore } from "vuex";

const store = useStore();

const route = useRoute();
const router = useRouter();
const obj = reactive({
  res: [],
});

//  监听 params 传入的数据
watch(
  () => route.params.mid,
  async () => {
    const r = await getSingerDetail(route.params.mid);
    const res = await processSong(r.songs);
    obj.res = res;
  },
  {
    immediate: true,
  }
);

const headStyle = computed(() => {
  return `background: url('${obj.res[2].pic}'); background-size: cover;`;
});


// 发送vuex请求
function selectSongItem({ item, index }) {
  store.dispatch("setPlay", { item, index });
}

function randomPlay(){
  store.dispatch('setRandomPlay', obj.res)
}

// 头像样式
const attrStyle = reactive({
  class: {},
});


function onScroll(y) {
  let scale = 1;
  let blur = 0;
  let transition = "all  .1s";

  if (y > 0) {
    scale -= Math.abs(y / 250);
    scale = Math.max(1, scale);
    blur = Math.abs(y / 250) * 10;
  } else {
    blur = 0;
    scale += Math.abs(y / 250);
    scale = Math.min(1.8, scale);
  }

  attrStyle.class = {
    transition,
    transform: `scale(${scale})`,
    filter: `blur(${blur}px)`,
    opacity: 0.9,
  };
}

function back() {
  router.go(-1);
}
</script>

<style lang="scss" scoped>
.detailList {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  z-index: 10;
  background-color: rgba(34, 34, 34, 0.9);
  .randomClass {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 35%;
    width: 100%;
    background-color: rgba(1, 1, 1, .2);
    .content {
      width: 200px;
      margin: 0 auto;
      border: 1px solid $color-theme;
      padding: 10px;
      border-radius: 20px;
      color: $color-theme;
      span {
        display: inline-block;
        margin-left: 40px;
        transform: translate(0, -2px);
        opacity: 0.8;
        font-size: $font-size-medium;
        
      }
    }
  }
  .back {
    position: fixed;
    top: 0;
    left: 0;
    height: 40px;
    width: 100%;
    z-index: 10;
    line-height: 40px;
    background-color: rgb(34, 34, 34);
    span {
      color: $color-theme;
      font-size: $font-size-large;
      margin: 10px;
      padding: 10px 0;
    }
    h2 {
      position: absolute;
      top: 0;
      left: 50%;
      white-space: nowrap;
      transform: translate(-50%);
      color: $color-theme;
      font-size: $font-size-medium;
      letter-spacing: 5px;
    }
  }
  .attr {
    padding-top: 35px;
    width: 100%;
    height: 250px;
    div {
      // position: relative;
      // z-index: 10;
      height: 100%;
      width: 100%;
      border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px;
    }
  }
}
</style>
