import * as types from './mutations-types'

export default {
  [types.SET_WEATHER] (state, weather) {
    state.weather = weather
    // console.log(state.weather)
  },
  [types.SET_FORECAST] (state, forecast) {
    state.forecast = forecast
    // console.log(state.forecast)
  },
  [types.SET_MAPS] (state, maps) {
    state.maps = maps
    // console.log(state.maps)
  },
  [types.SET_ADCODE] (state, adcode) {
    state.adcode = adcode
    // console.log(state.adcode)
  },
  [types.SET_CENTER] (state, center) {
    state.center = center
    // console.log(state.center)
  },
  [types.SET_TARGET] (state, target) {
    state.target = target
  },
  [types.SET_TARGET_NAME] (state, targetName) {
    state.targetName = targetName
  }
}
