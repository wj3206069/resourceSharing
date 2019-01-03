/*
 * @Description: 订单列表到详情传递数据
 * @version: v1.0
 * @Company: zx
 * @Author: LiuHui
 * @Date: 2018-12-01 15:12:42
 * @LastEditors: LiuHui
 * @LastEditTime: 2018-12-01 15:16:38
 */

const orderDeatil = {
  state: {
    orderDeatil: []
  },
  mutations: {
    setOrderDeatil(state, val) {
      state.orderDeatil = val
    }
  }
}
export default orderDeatil
