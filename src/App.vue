<template>
  <Header></Header>
  <Tabbar></Tabbar>
  <router-view></router-view>
  <SongStart/>
</template>

<script setup>
  import Header from './components/header/Header.vue';
  import Tabbar from './components/tabbar/Tabbar.vue';
  import SongStart from './components/SongStart/SongStart.vue'
</script>

<style lang="scss">
</style>
