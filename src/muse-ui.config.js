import 'muse-ui/lib/styles/base.less'
import {
  AppBar,
  Avatar,
  Button,
  ExpansionPanel,
  BottomNav,
  Carousel,
  Grid,
  Menu,
  List,
  TextField,
  AutoComplete,
  Progress,
  Tabs,
  Icon} from 'muse-ui'

const components = [Menu, List, ExpansionPanel, AutoComplete, Tabs, AppBar, Avatar, TextField, Button, Icon, Progress, BottomNav, Carousel, Grid]

export default {
  // Vue.use会触发一个 名叫install触发并接受Vue对象作为第一个参数
  install(Vue) {
    components.forEach(c => Vue.use(c))
  }
}
