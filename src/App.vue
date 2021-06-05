<template>
  <Header></Header>
  <Tabbar></Tabbar>
  <router-view></router-view>
</template>

<script setup>
  import Header from './components/header/Header.vue';
  import Tabbar from './components/tabbar/Tabbar.vue';
</script>

<style lang="scss">
</style>
