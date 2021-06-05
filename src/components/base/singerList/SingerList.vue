<template>
  <div class="fixTitle" :style="fixStyle">
    <span>{{ fixedTitle }}</span>
  </div>
  <Scroll
    :click="true"
    :probeType="2"
    class="wrapper"
    @onScroll="onScroll"
    ref="ScrollRef"
  >
    <div class="list">
      <ul class="ul_list" ref="group">
        <li v-for="(item, index) in singerList" :key="index" class="item1">
          <h2 class="ketTitle">{{ item.title }}</h2>
          <ul>
            <li
              v-for="(i, j) in item.list"
              :key="j"
              class="item2"
              @click="goDetails(i.mid)"
            >
              <div class="actv">
                <img v-lazy="i.pic" />
              </div>
              <div class="text">
                <span>{{ i.name }}</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </Scroll>
  <!-- 右侧导航栏 -->

  <div
    class="rightSearch"
    @touchstart.stop.prevent="touchStartFun"
    @touchmove.stop.prevent="touchMoveFun"
    @touchend.stop.prevent
  >
    <ul>
      <li
        v-for="(item, index) in searchList"
        :key="index"
        class="item"
        :class="{ active: index === currentIndex }"
        :data-index="index"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, ref, watch, defineEmit } from "vue";
import Scroll from "../scroll/Scroll.vue";
import useList from "./use-list.js";
import useRightSearch from "./use-right-search.js";

const props = defineProps({
  singerList: {
    type: Array,
    default() {
      return [];
    },
  },
});

const { fixedTitle, onScroll, group, fixStyle, currentIndex } = useList(
  props.singerList
);
const {
  searchList,
  touchStartFun,
  touchMoveFun,
  ScrollRef,
  lastIndex,
} = useRightSearch(props.singerList, group);

watch(lastIndex, () => {
  if (lastIndex.value >= 0 && lastIndex.value <= 18) {
    currentIndex.value = lastIndex.value;
  }
});

const emits = defineEmit(["goDetails"]);
function goDetails(mid) {
  emits("goDetails", mid);
}
</script>

<style lang="scss" scoped>
.rightSearch {
  position: fixed;
  right: 20px;
  top: 20%;
  text-align: center;
  font-size: $font-size-medium;
  color: $color-text-d;
  border-left: 1px solid $color-theme;
  padding-left: 8px;
  .item {
    margin-bottom: 8px;
    height: 15px;
    &.active {
      color: $color-theme;
    }
  }
}
.fixTitle {
  position: relative;
  left: 10%;
  height: 40px;
  line-height: 40px;
  font-size: $font-size-large;
  color: $color-theme;
}
.wrapper {
  height: 100%;
  overflow: hidden;
  .ul_list {
    .item1 {
      h2 {
        height: 40px;
        line-height: 40px;
        font-size: $font-size-large;
        text-align: center;
        color: $color-theme;
      }
      .item2 {
        display: flex;
        align-items: center;

        .actv {
          width: 60px;
          height: 60px;
          box-sizing: border-box;
          margin: 15px 20px 0;
          border-radius: 25px;
          overflow: hidden;
          img {
            height: 100%;
            width: 100%;
          }
        }
        .text {
          margin-left: 20px;
          margin-top: 10px;
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }
    }
  }
}
</style>
