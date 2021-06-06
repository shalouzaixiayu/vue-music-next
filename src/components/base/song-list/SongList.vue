<template>
  <!-- 封装歌手相关歌曲列表  -->
  <Scroll class="warpper" :probeType="2" @onScroll="onScroll">
    <ul class="list">
      <li v-for="(item, index) in songList" :key="index" class="index" @click="selectSong(index)">
        <img v-lazy="item.pic" />
        <span class="name">{{ item.name }}</span>
      </li>
    </ul>
  </Scroll>
</template>

<script setup>
import Scroll from "../scroll/Scroll.vue";
import { defineProps, defineEmit } from "vue";
const props = defineProps({
  songList: Array,
});
const emits = defineEmit(['onScroll', 'selectSongItem'])
function onScroll(y){
  emits('onScroll', y)
}
// 提交vuex请求
function selectSong(index){
  emits('selectSongItem', {item:props.songList, index})
}
</script>

<style lang="scss" scoped>
.warpper {
  position: relative;
  bottom: 0;
  height: calc(100% - 250px - 44px);

  .list {
    background-color: rgb(34, 34, 34);
    .index {
      margin: 10px;
      padding: 5px;
      display: flex;

      img {
        width: 60px;
        height: 60px;
      }
      .name {
        display: block;
        line-height: 60px;
        margin-left: 70px;
        color: $color-theme;
        font-size: $font-size-medium;
        opacity: 0.8;
      }
    }
  }
}
</style>
