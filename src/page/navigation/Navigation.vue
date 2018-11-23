<template>
  <div class="navigation">
    <div class="headerWrapper">
      <div class="back" @click.stop="back">返回</div>
      <div class="loaction">
        <div class="myloact"><span class="left">从</span> <span>我的位置</span></div>
        <div class="target"><span class="left">到</span> <span>{{targetName}}</span></div>
      </div>
      <mu-container>
        <mu-tabs inverse color="#000" text-color="rgba(0, 0, 0, .54)" full-width>
          <mu-tab to="byCar">驾 车</mu-tab>
          <mu-tab to="byBus">公交车</mu-tab>
          <mu-tab to="byBike">自行车</mu-tab>
          <mu-tab to="byWalk">步 行</mu-tab>
        </mu-tabs>
      </mu-container>
    </div>
    <div class="mapsWrapper">
      <div class="mapsBox">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    methods: {
      back() {
        this.$router.push('mapNav')
      }
    },
    computed: mapGetters({targetName: 'getTargetName'})
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .navigation
    margin: 0
    width: 100%
    height: 100%
    .headerWrapper
      width: 100%
      margin: 0
      min-height: 90px
      /*background: #00ffff*/
      .back
        width: 100%
        height: 40px
        line-height: 40px
        padding: 0 10px
      .loaction
        width: 100%
        /*text-align: center*/
        padding: 0 100px
        font-size: 18px
        font-weight: 700
        .myloact
          width: 100%
          height: 38px
          .left
            margin-right: 20px
        .target
          width: 100%
          height: 38px
          .left
            margin-right: 20px
      .container
        width: 100%
    .mapsWrapper
      position: absolute
      top: 160px
      bottom: 0
      left: 0
      width: 100%
      min-height: 300px
      /*background: #ff0000*/
      .mapsBox
        width: 100%
        height: 100%
</style>
