import {
  initialRouterMap,
  asyncRouteMap
} from '@/router'
import {
  getRoles
} from '@/until/role'

const permission = {
  state: {
    // routers: initialRouterMap,
    routers: initialRouterMap.concat(asyncRouteMap),
    addRouters: [],
    initialRouterLength: initialRouterMap.length,
    roles: getRoles()
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = initialRouterMap.concat(routers)
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  }
}

export default permission
