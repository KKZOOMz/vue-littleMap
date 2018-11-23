<template>
  <div class="byCarWrapper">
    <div ref="panel" class="detailInfo" @click="turnUp"></div>
    <div class="mapWrapper" ref="mapWrapper">
      <div ref="container" class="mapBox"></div>
    </div>
    <!--<div class="routesBox">-->
    <!--<div class="left">-->
    <!--<div class="routes">-->
    <!--<span>{{resetTime(routes.time)}} 分钟</span>-->
    <!--<span>{{setToFixed(routes.distance)}} 公里</span>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="right">-->
    <!--<div class="top">-->
    <!--<span>我的位置</span>-->
    <!--</div>-->
    <!--<div class="center">-->
    <!--<span>到</span>-->
    <!--</div>-->
    <!--<div class="bottom">-->
    <!--<span>{{this.$route.params.targetName}}</span>-->
    <!--</div>-->
    <!--</div>-->
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
        flag: false
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
      AMap.plugin('AMap.Driving', () => {
        var driving = new AMap.Driving({
          policy: AMap.DrivingPolicy.LEAST_TIME,
          map: map,
          panel: this.$refs.panel,
          ferry: 1, // 是否可以使用轮渡
          province: '粤' // 车牌省份的汉字缩写
        })
        // lng lat
        driving.search(new AMap.LngLat(center.lng, center.lat), new AMap.LngLat(target.lng, target.lat), (status, result) => {
          if (status === 'complete') {
//            console.log(result.routes[0])
//            console.log(result)
            this.routes = result.routes[0]
//            console.log(this.routes)
            if (result.routes && result.routes.length) {
              // 绘制第一条路线，也可以按需求绘制其它几条路线
              this.drawRoute(result.routes[0])
//              console.log('绘制驾车路线完成')
            }
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
      turnUp() {
        if (!this.flag) {
          this.$refs.mapWrapper.style.height = 476 + 'px'
//          this.$refs.panel.style.overflow = visible
//          console.log(this.$refs.mapWrapper.style.height)
          this.flag = !this.flag
        } else if (this.flag) {
          this.$refs.mapWrapper.style.height = 0
          this.flag = !this.flag
        }
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .byCarWrapper
    width: 100%
    height: 100%
    overflow: hidden
    .detailInfo
      width: 100%
      min-height: 70px
      /*overflow: hidden*/
      .amap-call
        width: 100%
        height: 0
      .planTitle
        width: 100%
        height: 70px
    .mapWrapper
      width: 100%
      height: 476px
      .mapBox
        width: 100%
        height: 100%
    .routesBox
      padding: 10px 20px
      width: 100%
      min-height: 100px
      display: flex
      .left
        flex: 1 1 160px
        width: 160px
        height: 100%
        text-align: left
        display: flex
        flex-direction: column
        /*border-right: 1px solid rgba(7, 17, 27, 0.3)*/
        .routes
          flex: 1
          width: 100%
          height: 40px
          line-height: 40px
          & > span
            display: inline-block
            font-size: 18px
            font-weight: 700
            margin-left: 20px

</style>
