/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './until' // 自定义的一些方法
import ElementUI from 'element-ui'
import elementUIVerify from 'element-ui-verify' // 表单验证


import './styles/element-variables.scss'
import './styles/index.scss'
import '@/assets/font/iconfont.css'
import '@/assets/style/common.less'
// 富文本
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Btable from '@/components/Table'

// import './permission' // 权限控制

import * as filters from './filter'

import '@/icons'

// 公共样式
import '@/styles/dxyq_common.less' // icon

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(elementUIVerify) // 这里注意必须得先use elementUI


Vue.component(Btable.name, Btable)

// Vue.use(VCharts)
// Vue.component(VeBar.name, VeBar)
// Vue.component(VeHistogram.name, VeHistogram)
// Vue.component(VePie.name, VePie)
// Vue.component(VeRing.name, VeRing)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
