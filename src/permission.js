import router from './router'
import store from './store'
import
{
  getRoles
} from '@/until/role'
import
{
  formatRoutes
} from '@/routerRules'

const whiteList = ['/user/login']
router.beforeEach((to, from, next) => {
  if (getRoles()) {
    if (to.path === '/user/login') {
      next({
        path: '/index'
      })
    } else {
      // next()
      if (store.getters.addRouters.length === 0) { // 判断当前用户是否有动态路由信息
        const roles = store.getters.roles.authorities
        if (roles && roles.length) {
          const ruleMaps = formatRoutes(roles)
          router.addRoutes(ruleMaps)
          store.commit('SET_ROUTERS', ruleMaps)
          // 解决动态路由刷新问题
          // router.addRoutes(newRouter)后需要next({ ...to, replace: true })
          // 来源：https://segmentfault.com/q/1010000015875314
          next({
            ...to,
            replace: true
          })
        } else {
          next()
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/user/login') // 否则全部重定向到登录页
    }
  }
})
