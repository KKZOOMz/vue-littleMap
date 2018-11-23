// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueAMap from 'vue-amap'
import router from './router'
// 全局引入Vuex
import store from './store'
// 全局引入MuseUI
import Muse from './muse-ui.config'
// 使用高德地图
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'fa70e0cbefd3b668d0f115cdbf98d607',
  plugin: ['AMap.Autocomplete', 'AMap.Driving', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})
// 使用MuseUI
Vue.use(Muse)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

router.push('mapNav')
