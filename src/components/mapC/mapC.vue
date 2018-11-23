<template>
  <div id="container" class="mymap" ref="container"></div>
</template>

<script>
  import AMap from 'AMap'
  export default {
    data() {
      return {
        weather: {}
      }
    },
    mounted() {
      this.initMap()
    },
    methods: {
      initMap() {
        // eslint-disable-next-line
        var map = new AMap.Map(this.$refs.container, {
          resizeEnable: true,
          center: [113.434978, 23.160922],
          zoom: 16
        })
//        Adcode
        let Adcode = map.getAdcode()
        let Center = map.getCenter()
        this.$store.commit('SET_ADCODE', Adcode)
        this.$store.commit('SET_CENTER', Center)
//        console.log(Adcode)
//        console.log(Center)
//        this.$store.commit('SET_ADCODE', )
        this.$store.commit('SET_MAPS', map)
        // eslint-disable-next-line
//        this.getWeather(this.$store.state.maps)
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .mymap
    width: 100%
    height: 100%
    .weather
      width: 5rem
      display: inline-block
      padding-left: 0.5rem
    .sharp
      height: 1rem
      width: 1rem
      background-color: white
      transform: rotateZ(45deg)
      box-shadow: 2px 2px 3px rgba(114, 124, 245, .5)
      position: inherit
      margin-left: 10.5rem
      margin-top: -6px
</style>
