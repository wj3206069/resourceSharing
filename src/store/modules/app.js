import Cookies from 'js-cookie'
import {
  loginOut
} from '@/api/article'
import {
  getToken,
  removeToken,
  setToken
} from '@/until/auth'
import {
  removeRoles,
  setRoles
} from '@/until/role'
import {
  getLogin
} from '../../api/article'

const app = {
  state() {
    return {
      sidebar: {
        opened: !+Cookies.get('sidebarStatus'),
        withoutAnimation: false
      },
      device: 'desktop',
      token: getToken()
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    } // 设置token
  },
  actions: {
    ToggleSideBar: ({
      commit
    }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({
      commit
    }, {
      withoutAnimation
    }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({
      commit
    }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeRoles()
        resolve()
      })
    },
    Login(
      { commit }
    , userInfo) {
      return new Promise((resolve, reject) => {
        getLogin(userInfo).then(res => {
          const data = res.data
          if (data.success) {
            const user = data.user
            const roles = data.menuTree ? data.menuTree : []
            commit('SET_ROLES', roles)
            commit('SET_TOKEN', user)
            setToken(user)
            setRoles(roles)
            resolve()
          } else {
            reject(data.message)
          }
        }).catch((error) => {
          reject(error)
        })
      })
    },
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        const username = state.token
        loginOut(username).then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default app
