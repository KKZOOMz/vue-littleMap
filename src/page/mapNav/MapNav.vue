<template>
  <div class="mapWrapper">
    <mu-container>
      <!--<input v-model="value" ref="inp" @input="autoIno"/>-->
      <!--:data="searchResult"-->
      <mu-auto-complete :data="searchResultName" :max-search-results="5" ref="inp" @input="autoIno"
                        v-model="value"></mu-auto-complete>
      <br/>
    </mu-container>
    <div class="navBtn">
      <mu-button fab large color="blue" @click="navBegin">
        <mu-icon value="navigation"></mu-icon>
      </mu-button>
    </div>
    <mapC></mapC>
    <!--<div class="info">-->
    <!--<h4>预报天气</h4><hr>-->
    <!--<p id='forecast'></p>-->
    <!--</div>-->
  </div>
</template>

<script>
  import AMap from 'AMap'
  import mapC from '../../components/mapC/mapC.vue'
  export default {
    data() {
      return {
        value: '',
        searchResult: [],
        searchResultName: []
      }
    },
    components: {
      mapC
    },
    mounted() {
      let position = this.$store.getters.getCenter
      var marker = new AMap.Marker({
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        position: [position.P, position.O]
      })
      marker.setMap(this.$store.state.maps)
    },
    methods: {
      // 自动补全搜索
      autoIno() {
        let adcode = this.$store.getters.getAdcode
        AMap.plugin('AMap.Autocomplete', () => {
          // 实例化Autocomplete
          let autoOptions = {
            city: adcode
          }
          let autoComplete = new AMap.Autocomplete(autoOptions)
          autoComplete.search(this.value, (status, result) => {
            // 搜索成功时，result即是对应的匹配数据
//            console.log(result)
//            console.log(result.tips)
//            console.log(typeof result.tips)
//            console.log(typeof result)
            this.searchResult = result.tips
//            this.searchResult = result
//            this.searchResult = result.tips
//            lat lng
//            console.log(this.searchResult)
//            console.log(typeof this.searchResult[0].location)
//            console.log(this.searchResult[0].location.lat)
            for (let i in this.searchResult) {
              this.$set(this.searchResultName, i, this.searchResult[i].name)
            }
//            console.log(this.searchResultName)
          })
        })
      },
      // 点击进入导航
      navBegin() {
        // eslint-disable-next-line
        let navc = this.searchResult.find(m => m.name === this.value)
//        console.log(navc)
        let target = navc.location
        this.$store.commit('SET_TARGET', target)
        this.$store.commit('SET_TARGET_NAME', this.value)
        this.$router.push('byCar')
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .mapWrapper
    width: 100%
    height: 100%
    .container
      position: absolute
      top: 20px
      left: 10%
      right: auto
      z-index: 100
      width: 80%
      height: 56px
      text-align: center
      background-color: #fff
      .mu-input
        width: 100%
        height: 100%
    .navBtn
      position: fixed
      right: 10px
      bottom: 100px
      z-index: 100

</style>
