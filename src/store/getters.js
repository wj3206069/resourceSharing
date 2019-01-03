const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.app.token,
  userInfo: state => state.user.userInfo,
  roles: state => state.permission.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  initialRouterLength: state => state.permission.initialRouterLength,
  subMenuInfo: state => state.subMenuList.subMenuList,
  orderDeatil: state => state.orderDeatil.orderDeatil

}
export default getters
