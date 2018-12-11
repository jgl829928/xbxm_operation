import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import httpPlugin from '@/utils/http'
import store from './vuex/store'
import router from './routes'
import '@/styles/reset.less'
import '@/assets/theme/index.css'
import '@/assets/fonts/iconfont/iconfont.css'
import '@/assets/fonts/font/iconfont.css'
import '@/styles/index.less'
import 'babel-polyfill'

Vue.use(ElementUI)
Vue.use(httpPlugin)

// 导航守卫
router.beforeEach((to, from, next) => {

  let gTicket = store.state.gTicket
  let routers = store.state.routers
  if (!from.name && gTicket) next()
  else if (from.name && gTicket && to.name === 'login') router.go(-1)

  if (!gTicket && to.path !== '/login') next({ path: '/login' })
  else next()

  // if (from.name && to.name !== 'login') {
  //   for (let i of routers) {
  //     if (to.path === i) {
  //       return false
  //     }
  //   }
  //   next(from.name)
  // }

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
