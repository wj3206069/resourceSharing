/*
 * @Description: 后台订单-机构
 * @version: v1.0
 * @Company: zx
 * @Author: LiuHui
 * @Date: 2018-11-19 11:27:53
 * @LastEditors: LiuHui
 * @LastEditTime: 2018-12-01 15:50:58
 */

import request from './define.js'
import {
  API
} from './index'
// POST - data
// GET - params
// 机构方
// 获取订单列表
export function orderList(query) {
  return request({
    url: API + '/orgOrderManagement/queryOrgOrderList',
    method: 'get',
    params: query
  })
}
// 开始接单~完成 集合
export function orderHandle(query, url) {
  return request({
    url: API + `/orgOrderManagement/${url}`,
    method: 'post',
    data: query
  })
}
// 开始接单
export function takeOrder(query) {
  return request({
    url: API + '/orgOrderManagement/updateOrgOrderReceive',
    method: 'post',
    data: query
  })
}
// 拒绝接单
export function rejectOrder(query) {
  return request({
    url: API + '/orgOrderManagement/updateOrgOrderRefuse',
    method: 'post',
    data: query
  })
}
// 开始服务
export function beganService(query) {
  return request({
    url: API + '/orgOrderManagement/updateOrgServiceStart',
    method: 'post',
    data: query
  })
}
// 完成
export function OrderFinish(query) {
  return request({
    url: API + '/orgOrderManagement/updateOrgServiceEnd',
    method: 'post',
    data: query
  })
}
// 评价
export function pingjia(query) {
  return request({
    url: API + '/orgOrderManagement/orgEvaluationToBuyer',
    method: 'post',
    data: query
  })
}
// 验收样品
export function checkSample(query) {
  return request({
    url: API + '/orgOrderManagement/updateOrgSpecimenStatus',
    method: 'post',
    data: query
  })
}
// 查询寄件信息列表
export function checkExpressage(orderId) {
  return request({
    url: API + `/orgOrderManagement/queryOrgLogisticsList/${orderId}`,
    method: 'get'
  })
}
// 查询tabs数量
export function tabsNum() {
  return request({
    url: API + '/orgOrderManagement/getOrgTabNums',
    method: 'get'
  })
}
// 查询寄件信息列表
export function goExpressage(query) {
  return request({
    url: API + '/orgOrderManagement/orgSendGoods',
    method: 'post',
    data: query
  })
}
// 获取售后单个订单数据
export function getDispose(orderId) {
  return request({
    url: API + `/orgOrderManagement/getOrgAfterInfo/${orderId}`,
    method: 'get'
  })
}
// 机构回复售后
export function replyDispose(query) {
  return request({
    url: API + '/orgOrderManagement/orgDealAfter',
    method: 'post',
    data: query
  })
}
// 获取设备列表
export function getDevice(orderId) {
  return request({
    url: API + `/orgOrderManagement/queryChangeInstrumentList/${orderId}`,
    method: 'get'
  })
}
// 改变设备
export function confirmChangeDevice(query) {
  return request({
    url: API + '/orgOrderManagement/changeOrgInstrument',
    method: 'post',
    data: query
  })
}
// 查找同类型的设备
export function getCheckDevice(query) {
  return request({
    url: API + '/orgOrderManagement/queryChangeInstrumentList',
    method: 'get',
    params: query
  })
}
// 获取报告列表
export function getReportList(orderId) {
  return request({
    url: API + `/orgOrderManagement/queryOrgOrderReportList/${orderId}`,
    method: 'get'
  })
}
// 查看样品异常信息
export function sampleErrList(orderId) {
  return request({
    url: API + `/orgOrderManagement/querySpecimenList/${orderId}`,
    method: 'get'
  })
}
// 查看终止售后信息
export function afterSaleOverInfo(orderId) {
  return request({
    url: API + `/orgOrderManagement/getOrgAfterStopInfo/${orderId}`,
    method: 'get'
  })
}
// 获取电子协议信息
export function getDeallist(orderId) {
  return request({
    url: API + `/orgOrderManagement/queryOrgContractList/${orderId}`,
    method: 'get'
  })
}
// 删除订单报告
export function deletePreview(query) {
  return request({
    url: API + '/orgOrderManagement/deleteReport',
    method: 'post',
    data: query
  })
}
// 详情
// 机构方查询订单合约列表
export function getContarct(orderId) {
  return request({
    url: API + `/orgOrderManagement/queryOrgOrderContractList/${orderId}`,
    method: 'get'
  })
}
// 机构方查询订单地址
export function getOrderList(orderId) {
  return request({
    url: API + `/orgOrderManagement/queryOrgOrderAddrInfo/${orderId}`,
    method: 'get'
  })
}
// 机构方查询订单发票信息列表
export function getBillList(orderId) {
  return request({
    url: API + `/orgOrderManagement/queryOrgOrderInvoiceList/${orderId}`,
    method: 'get'
  })
}
// 机构方查询订单费用列表
export function getCostList(orderId) {
  return request({
    url: API + `/orgOrderManagement/queryOrgOrderCostList/${orderId}`,
    method: 'get'
  })
}
// 机构方查询订单评价列表
export function getEvaluateList(orderId) {
  return request({
    url: API + `/orgOrderManagement/queryOrgOrderEvaluationList/${orderId}`,
    method: 'get'
  })
}

// 登录提交
// export function loginBtn () {
//   return request({
//     url: API + `/gatewaymanagement/gatewayLogin`,
//     method: 'post'
//   })
// }
