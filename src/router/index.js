import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import Test from '../components/Test.vue'
import {Weather, MapNav, Home, Navigation, ByBike, ByBus, ByCar, ByWalk} from '../page'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {path: '/weather', name: 'weather', component: Weather},
        {path: '/mapNav', name: 'mapNav', component: MapNav}
      ]
    },
    {
      path: '/navigation',
      name: 'navigation',
      component: Navigation,
      children: [
        {path: '/byCar', name: 'byCar', component: ByCar},
        {path: '/byBus', name: 'byBus', component: ByBus},
        {path: '/byBike', name: 'byBike', component: ByBike},
        {path: '/byWalk', name: 'byWalk', component: ByWalk}
      ]
    }
  ]
})
