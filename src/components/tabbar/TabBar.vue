<template>
  <mu-container>
    <mu-bottom-nav :value.sync="tab" @change="change">
      <mu-bottom-nav-item value="weather" title="天气" icon="chat_bubble_outline"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="mapNav" title="地图" icon="chat_bubble_outline"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </mu-container>
</template>

<script>

  export default {
    name: 'TabBar',
    data() {
      return {
        tab: 'mapNav'
      }
    },
    methods: {
      change(val) {
        this.$router.push(val)
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>

</style>
