<template>
  <div id="container" class="mymap"></div>
</template>

<script>
  import AMap from 'AMap'
  export default {
    mounted() {
      this.loadmap()
    },
    methods: {
      loadmap () {
        // eslint-disable-next-line
        let map = new AMap.Map('container', {
          resizeEnable: true, // 是否监控地图容器尺寸变化
          zoom: 13,
          center: [113.434978, 23.160922]
        })
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .mymap
    width: 500px
    height: 500px
</style>
