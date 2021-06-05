<template>
  <div class="recommend">
    <Scroll :click="true" :probeType="2" class="wrapper">
      <div>
        <div class="slider-wrapper">
          <div class="slider-content">
            <!--导入轮播图组件-->
            <Slider v-if="obj.sliders.length >= 1" :sliderList="obj.sliders" />
          </div>
        </div>
        <!--推荐信息-->
        <div class="recommend-list">
          <h1 class="title">热门歌曲推荐</h1>
          <ul>
            <li v-for="(item, index) in obj.albums" :key="index" class="item">
              <div class="icon">
                <img v-lazy="item.pic" width="60" height="60" />
              </div>
              <div class="text">
                <h2 class="name">
                  {{ item.username }}
                </h2>
                <p class="t">
                  {{ item.title }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script setup>
import Slider from "../components/base/slider/Slider.vue";
import Scroll from "../components/base/scroll/Scroll.vue";

import { getRecommend } from "../network/recommend.js";
import { reactive, onMounted } from "vue";

const obj = reactive({
  sliders: [],
  albums: [],
});

onMounted(async () => {
  const res = await getRecommend();
  obj.sliders = res.sliders;
  obj.albums = res.albums;
});

</script>

<style lang="scss" scoped>
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0px;
  .wrapper {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;
      .slider-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
}
.recommend-list {
  margin-top: 10px;
  .title {
    height: 65px;
    line-height: 65px;
    letter-spacing: 5px;
    text-align: center;
    color: $color-theme;
  }
  .item {
    color: #fff;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    width: 100%;
    overflow: hidden;
    .icon {
      width: 60px;
      padding: 5px 20px;
    }
    .text {
      margin-left:10px;
      padding: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 20px;
      overflow: hidden;
      font-size: $font-size-medium;
      .name {
        // text-align: center;
        color: $color-text;
        margin-bottom: 10px;
      }
      .t {
        color: $color-text-d;
      }
    }
  }
}
</style>
