<template>
  <div class="header">
    <img src="/src/assets/images/default.png"/>
    <h1 class="title" @click="goHome">{{title}}</h1>
  </div>  
</template>

<script setup>
  import {ref} from "vue"
  import {useRouter} from "vue-router"

  const title = ref('Small Music')
  const router = useRouter()
  function goHome(){
    router.push({
      name:"recommend",
    })
  }

</script>

<style lang="scss" scoped>
  .header{
    height:44px;
    display:flex;
    justify-content:center;
    border-bottom: 1px solid $color-theme-d;

    img{
      height: 22px;
      width: 22px;
      margin-top:10px;
    }
    h1{
      line-height:44px;
      margin-left: 10px;
      font-size: 22px;
      color: $color-theme;
    }
  }
</style>