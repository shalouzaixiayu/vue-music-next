<template>
  <div class="tab">
    <router-link
      class="item"
      v-for="(item, index) in paths"
      :key="index"
      :to="item.path"
    >
      <span>{{ item.name }}</span>
    </router-link>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const paths = reactive([
  {
    path: "/recommend",
    name: "推荐",
  },
  {
    path: "/singer",
    name: "歌手",
  },
  {
    path: "/top-list",
    name: "排行",
  },
  {
    path: "/search",
    name: "搜索",
  },
]);
</script>

<style lang="scss">
.tab {
  display: flex;
  justify-self: center;

  .item {
    flex: 1;
    text-align: center;
    height: 36px;
    line-height: 36px;
    color: $color-text-d;
    letter-spacing: 2px;

    &.router-link-active {
      span {
        color: $color-theme;
        border-bottom: 2px solid $color-theme;
        padding-bottom: 5px;
      }
    }
  }
}
</style>
