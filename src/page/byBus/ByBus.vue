<template>
  <div class="byBikeWrapper">
    <div ref="panel" class="detailInfo"></div>
    <div ref="container" class="mapBox"></div>
    <!--<div>{{plans}}</div>-->
  </div>
</template>

<script>
  import AMap from 'AMap'
  export default {
    components: {},
    data() {
      return {
        target: {},
        center: {},
        map: {},
        routes: {},
        cityinfo: '',
        citybounds: '',
        flag: false,
        plans: []
      }
    },
    mounted() {
      /* eslint-disable */
      let target = this.target = this.$store.getters.getTarget
      let center = this.center = this.$store.getters.getCenter
      // eslint-disable-next-line
      let map = new AMap.Map(this.$refs.container, {
        resizeEnable: true,
        center: [center.lng, center.lat],
        zoom: 16,
      })
      this.map = map
//      console.log(target)
//      console.log(center)
//      this.showCityInfo()

      AMap.plugin('AMap.Transfer', () => {
//        console.log('begin')
        var transfer = new AMap.Transfer({
          policy: AMap.TransferPolicy.LEAST_TIME,
          map: map,
          city: '广州市',
          panel: this.$refs.panel,
//          city: this.$store.getters.getAdcode
        })
//        console.log('test')
        // lng lat
        transfer.search(new AMap.LngLat(center.lng, center.lat), new AMap.LngLat(target.lng, target.lat), (status, result) => {
          if (status === 'complete') {
//            console.log(result.routes[0])
//            console.log(result.plans)
//            console.log(typeof result.plans)
            this.plans = result.plans
//            console.log(this.plans)
//            console.log(this.routes)
//            if (result.routes && result.routes.length) {
//              // 绘制第一条路线，也可以按需求绘制其它几条路线
//              console.log(result)
//              this.drawRoute(result.routes[0])
//              console.log('绘制驾车路线完成')
//            }
          }
        })
      })

    },
    methods: {
      resetTime(val) {
        return Math.ceil(val / 60)
      },
      setToFixed(val) {
        return (val / 1000).toFixed(2)
      },
      drawRoute(route) {
//        console.log('开始绘制驾车路线')
        var path = this.parseRouteToPath(route)

//        console.log('test')
        var startMarker = new AMap.Marker({
          position: path[0],
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
          map: this.map
        })

        var endMarker = new AMap.Marker({
          position: path[path.length - 1],
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
          map: this.map
        })
        var routeLine = new AMap.Polyline({
          path: path,
          isOutline: true,
          outlineColor: '#ffeeee',
          borderWeight: 2,
          strokeWeight: 5,
          strokeColor: '#0091ff',
          lineJoin: 'round'
        })
        routeLine.setMap(this.map)
        // 调整视野达到最佳显示区域
//        this.map.setFitView([startMarker, endMarker, routeLine])
      },
      // 解析DrivingRoute对象，构造成AMap.Polyline的path参数需要的格式
      // DrivingResult对象结构参考文档 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DriveRoute
      parseRouteToPath(route) {
        var path = []

        for (var i = 0, l = route.steps.length; i < l; i++) {
          var step = route.steps[i]

          for (var j = 0, n = step.path.length; j < n; j++) {
            path.push(step.path[j])
          }
        }

        return path
      },
      showCityInfo() {
        //实例化城市查询类
        var citysearch = new AMap.CitySearch()

        citysearch.getLocalCity((status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            if (result && result.city && result.bounds) {
//              console.log(result.city)
              this.cityinfo = result.city;
              this.flag = true
            }
          }
        })
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .detailInfo
    width: 100%
    height: 100%
</style>
