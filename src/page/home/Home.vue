<template>
  <div class="home">
    <div class="view">
      <router-view></router-view>
    </div>
    <div class="tabbar">
      <TabBar></TabBar>
    </div>
  </div>
</template>

<script>
  import {TabBar} from '../../components'
  export default {
    components: {
      TabBar
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .home
    width: 100%
    height: 100%
    .view
      position: fixed
      top: 0
      bottom: 60px
      left: 0
      right: 0
      width: 100%
    .tabbar
      position: fixed
      bottom: 0
      left: 0
      right: 0
      width: 100%
</style>
