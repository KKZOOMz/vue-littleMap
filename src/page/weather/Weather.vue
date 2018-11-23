<template>
  <div class="weatherWrapper">
    <div class="nowWeather">
      <h2>实时天气</h2>
      <div class="content clearfix"><span class="left">地区: </span><span class="right">{{weathers.city}}</span><br/></div>
      <div class="content clearfix"><span class="left">天气: </span><span class="right">{{weathers.weather}}</span><br/></div>
      <div class="content clearfix"><span class="left">温度: </span><span class="right">{{weathers.temperature}}&#8451;</span><br/></div>
      <div class="content clearfix"><span class="left">风向: </span><span class="right">{{weathers.windDirection}}</span><br/></div>
      <div class="content clearfix"><span class="left">风力: </span><span class="right">{{weathers.windPower}}</span><br/></div>
      <div class="content clearfix"><span class="left">湿度: </span><span class="right">{{weathers.humidity}}</span><br/></div>
    </div>
    <div class="futureWrapper">
      <h2>未来四天天气预报</h2>
      <div class="futureList">
        <span>日期</span>
        <span>天气</span>
        <span>温度</span>
      </div>
      <div class="futureList" v-for="(item, index) in forecasts" :key="index">
        <span>{{getWeek(item.week)}}</span>
        <span>{{item.dayWeather}} - {{item.nightWeather}}</span>
        <span>{{item.dayTemp}} / {{item.nightTemp}} &#8451;</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import AMap from 'AMap'
  export default {
    data() {
      return {
        weathers: {},
        forecasts: []
      }
    },
    mounted() {
//      console.log(this.maps)
      this.getWeather(this.maps)
    },
    computed: {
      ...mapGetters({
        maps: 'getMaps'
      })
    },
    methods: {
      getWeek(val) {
        let week = ['一', '二', '三', '四', '五', '六', '日']
        return '星期' + week[val - 1]
      },
      getWeather(map) {
        let Adcode = map.getAdcode()
        AMap.plugin('AMap.Weather', () => {
          var weather = new AMap.Weather()
          weather.getLive(Adcode, (err, data) => {
            if (!err) {
//              console.log(data)
//              console.log(typeof data)
//              this.weather = data
//              console.log(this.weather)
//              console.log(this.$store)
//              this.$store.commit('SET_WEATHER', data)
              this.weathers = data
            }
          })
          weather.getForecast(Adcode, (err, data) => {
            if (!err) {
//              console.log(data)
              this.forecasts = data.forecasts
//              console.log(this.forecasts)
//              this.$store.commit('SET_FORECAST', data.forecasts)
            }
          })
        })
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .weatherWrapper
    padding-top: 120px
    width: 100%
    height: 100%
    background: #2955F3
    background: linear-gradient(to right, #2955F3 0%, #7db8e7 70%)
    color: #fff
    text-align: center
    .nowWeather
      width: 100%
      min-height: 100px
      padding: 10px 140px
      h2
        font-size: 20px
        font-weight: 700
        font-style: italic
      .content
        & > span
          font-size: 20px
          /*display: block*/
          display: inline-block
        .left
          float: left
        .right
          float: right
    .futureWrapper
      margin-top: 30px
      width: 100%
      min-height: 100px
      h2
        font-size: 20px
        font-weight: 700
        font-style: italic
      .futureList
        margin-top: 20px
        display: flex
        width: 100%
        & > span
          display: block
          flex: 1
          width: 100px
          font-size: 16px

</style>
