/*
 * @Description: 后台订单-平台
 * @version: v1.0
 * @Company: zx
 * @Author: LiuHui
 * @Date: 2018-12-01 10:44:25
 * @LastEditors: LiuHui
 * @LastEditTime: 2018-12-01 11:06:11
 */
import request from './define.js'
import {
  API
} from './index'
// POST - data
// GET - params
// 获取订单列表
export function orderList(query) {
  return request({
    url: API + '/platformOrderManagement/queryPlatformOrderList',
    method: 'get',
    params: query
  })
}
// 查询物流信息列表
export function logisticsInfoList(query) {
  return request({
    url: API + '/platformOrderManagement/queryPlatformLogisticsList',
    method: 'get',
    params: query
  })
}
// 查询电子报告列表
export function checkReportList(orderId) {
  return request({
    url: API + `/platformOrderManagement/queryPlatformLogisticsList/${orderId}`,
    method: 'get'
  })
}
// 查询订单合约列表
export function checkCompactList(orderId) {
  return request({
    url: API + `/platformOrderManagement/queryPlatformOrderContractList/${orderId}`,
    method: 'get'
  })
}
// 查询订单地址
export function checkOrderAddress(orderId) {
  return request({
    url: API + `/platformOrderManagement/queryPlatformOrderAddrInfo/${orderId}`,
    method: 'get'
  })
}
// 查询订单发票信息列表
export function checkInvoiceList(orderId) {
  return request({
    url: API + `/platformOrderManagement/queryPlatformOrderInvoiceList/${orderId}`,
    method: 'get'
  })
}
// 查询订单费用列表
export function checkOrderCostList(orderId) {
  return request({
    url: API + `/platformOrderManagement/queryPlatformOrderCostList/${orderId}`,
    method: 'get'
  })
}
// 查询订单评价列表
export function checkOrderEvaluationList(orderId) {
  return request({
    url: API + `/platformOrderManagement/queryPlatformOrderEvaluationList/${orderId}`,
    method: 'get'
  })
}

// 查询tabs数量
export function tabsNum() {
  return request({
    url: API + '/platformOrderManagement/getPlamformTabNums',
    method: 'get'
  })
}
