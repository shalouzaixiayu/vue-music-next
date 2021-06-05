<template>
  <div class="list">
    <SingerList
      v-if="singerList.list.length >= 2"
      :singerList="singerList.list"
      @goDetails="goDetails"
    >
    </SingerList>

    <!-- 详情页 -->
    <router-view v-slot="{ Component }">
      <transition  appear name="slide">
        <component :is="Component"/>
      </transition >
    </router-view>

  </div>
</template>
<script setup>
import { getSingerList } from "../network/getSingerList.js";
import SingerList from "../components/base/singerList/SingerList.vue";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const singerList = reactive({
  list: [],
});

// const mids = ref(0)

onMounted(async () => {
  const res = await getSingerList();
  singerList.list = res.singers;
});

// 跳转详情页
const router = useRouter();

function goDetails(mid) {
  // mids.value = mid
  router.push({
    path: `/singer/${mid}`,
  });
}
</script>

<style lang="scss" scoped>
.list {
  position: fixed;
  top: 88px;
  bottom: 0px;
  width: 100%;
}
</style>
