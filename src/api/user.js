/*
 * @Description:
 * @version: 用户相关 接口管理
 * @Company: zx
 * @Author: LiuHui
 * @Date: 2018-11-19 11:27:20
 * @LastEditors: LiuHui
 * @LastEditTime: 2018-12-21 17:02:32
 */

import request from './define.js'
import {
  API
} from './index'

// POST - data
// GET - params

// 登录
export function getLogin(query) {
  return request({
    url: API + '/login/addlogin',
    method: 'post',
    data: query
  })
}

// 退出
export function loginOut(query) {
  return request({
    url: API + '/login/cancellation',
    method: 'get',
    params: query
  })
}

// 注册

export function register(query) {
  return request({
    url: API + '/gatewaymanagement/addGatewayAccount',
    method: 'get',
    params: query
  })
}
// 获取手机验证码

export function registerTelCode(query) {
  return request({
    url: API + '/login/getSMSVerification',
    method: 'get',
    params: query
  })
}
// 登录图形验证码
export function getPicCode() {
  return request({
    url: API + '/login/captcha',
    method: 'get'
  })
}
// 忘记用户名
export function forgetUserName(query) {
  return request({
    url: API + `/login/retrieveUserName`,
    method: 'get',
    params: query
  })
}
// 忘记密码
export function forgetPassword(query) {
  return request({
    url: API + `/login/retrievePassword`,
    method: 'get',
    params: query
  })
}
// 设置新密码
export function resetPassword(query) {
  return request({
    url: API + `/login/resetPassword`,
    method: 'get',
    params: query
  })
}
// 服务机构和单位认证
export function serviceUnitScertification(query) {
  return request({
    url: API + `/gatewaymanagement/serviceInstitutionsUnitScertification`,
    method: 'post',
    params: query
  })
}
// 超级管理员信息
export function superManageInfo(query) {
  return request({
    url: API + `/gatewaymanagement/getSuperAdministratorInformation`,
    method: 'post',
    params: query
  })
}
// 获取服务类目
export function getSerive() {
  return request({
    url: API + `/gatewaymanagement/getServiceCategoryInformation`,
    method: 'get'
  })
}
// 用户中心
export function userCenter() {
  return request({
    url: API + `/userCenter/getUnitBasicInformation`,
    method: 'get'
  })
}
// 用户中心
export function editUserCenter(query) {
  return request({
    url: API + `/userCenter/editUnitBasicInformation`,
    method: 'post',
    params: query
  })
}
