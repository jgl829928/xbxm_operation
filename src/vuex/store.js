import Vue from 'vue'
import Vuex from 'vuex'
import { getUser, delUser } from '@/utils/auth'
import * as getters from './getters'
import * as actions from './actions'

Vue.use(Vuex)

/**
 * Vuex全局状态管理
 * @param options {Array} 用于渲染tabs的数组
 */
const store = new Vuex.Store({
  state: {
    options: [],
    activeIndex: '/user',
    activeName: "",
    currentUser: JSON.parse(getUser('optimize_userInfo')),
    isLogin: false,
    gTicket: getUser('optimize_gTicket'),
    fullPath: "",
    permissionKeys: [],
    keepAlivePage: [],
    routers: []
  },
  getters,
  actions,
  mutations: {
    // 添加tabs
    add_tabs(state, data) {
      this.state.options.push(data);
      this.state.options = Array.from(new Set(this.state.options))
    },
    // 删除tabs
    delete_tabs(state, route) {
      let index = 0, name = route.meta.name, routeName = route.name;
      for (let option of state.options) {
        if (option.name === name) {
          break;
        }
        index++
      }
      this.state.options.splice(index, 1);

      let keepAlivePage = state.keepAlivePage;
      for (let i = 0; i < keepAlivePage.length; i++) {
        if (keepAlivePage[i] === routeName) {
          keepAlivePage.splice(i, 1)
        }
      }
    },

    // 删除所有的tabs
    delete_allTab(state, data) {
      this.state.options = [];
    },

    // 设置当前激活的tab
    set_active_index(state, index) {
      this.state.activeIndex = index
    },
    
    // 用户信息
    userStatus(state, userInfo) {
      if (userInfo) {
        window.sessionStorage.setItem('optimize_userInfo', JSON.stringify(userInfo))
        state.currentUser = userInfo
        state.isLogin = true
      } else if (userInfo == null) {
        delUser('optimize_userInfo')
        delUser('optimize_gTicket')
        state.currentUser = null
        state.isLogin = false
        state.gTicket = null
      }
    },

    // 用户信息
    gTicketStatus(state, gTicket) {
      if (gTicket) {
        window.sessionStorage.setItem('optimize_gTicket', gTicket)
        state.gTicket = gTicket
        state.isLogin = true
      } else if (gTicket == null) {
        delUser('optimize_gTicket');
        state.isLogin = false
        state.gTicket = null
      }
    },

    // permission_id
    set_permission(state, data) {
      state.permissionKeys = data.permissionKeys;
      state.routers = data.routers;
    },

    add_keep_alive(state, data) {
      if (!state.keepAlivePage.includes(data)) state.keepAlivePage.push(data);
    },

    del_keep_alive(state, data) {
      let keepAlivePage = state.keepAlivePage;
      for (let i = 0; i < keepAlivePage.length; i++) {
        if (keepAlivePage[i] === data) {
          keepAlivePage.splice(i, 1)
        }
      }
    },
  }
});
export default store;
