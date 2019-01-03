/*
 * @Description: 客户管理api
 * @version: v1.0
 * @Company: zx
 * @Author: LiuHui
 * @Date: 2018-12-03 09:43:59
 * @LastEditors: LiuHui
 * @LastEditTime: 2018-12-12 19:39:24
 */
import request from './define.js'
import {
  API
} from './index'
// POST - data
// GET - params

// 获取单位信息列表
export function unitUserList(query) {
  return request({
    url: API + '/backstagemanagement/getBackstageSystemUnitInformationList',
    method: 'get',
    params: query
  })
}
// 导入账号信息
export const importFile = API + '/backstagemanagement/importBackstageSystemUserInformation'
// 导出账号信息
export const exportFile = API + '/backstagemanagement/exportBackstageSystemUserInformation'
// 获取信息来源
export function userSource(query) {
  return request({
    url: API + '/backstagemanagement/gettingInformationSources',
    method: 'get',
    params: query
  })
}
// 获取单位信息ByID
export function unitUserDetail(query) {
  return request({
    url: API + '/backstagemanagement/getBackstageSystemUnitInformationById',
    method: 'get',
    params: query
  })
}
// 审核
export function unitUserAudit(query) {
  return request({
    url: API + '/backstagemanagement/nonProcessAudit',
    method: 'post',
    data: query
  })
}
// 创建单位
export function createUnit(query) {
  return request({
    url: API + '/backstagemanagement/addBackstageSystemUnitInformation',
    method: 'post',
    data: query
  })
}
// 创建超级管理员
export function createSuperAdmim(query) {
  return request({
    url: API + '/backstagemanagement/addSuperAdministratorInformation',
    method: 'post',
    data: query
  })
}
// 个人-人员列表
export function personalList(query) {
  return request({
    url: API + '/backstagemanagement/getBackstageSystemUserInformationList',
    method: 'get',
    params: query
  })
}
// 个人详情
export function personalDetail(query) {
  return request({
    url: API + '/backstagemanagement/getBackstageSystemUserInformationById',
    method: 'get',
    params: query
  })
}
// 单位人员编辑
export function unitUserEdit(query) {
  return request({
    url: API + '/backstagemanagement/editBackstageSystemUnitInformation',
    method: 'post',
    data: query
  })
}
// 新增门户账号信息
export function addAccountInfo(query) {
  return request({
    url: API + '/backstagemanagement/addBackstageAccount',
    method: 'post',
    data: query
  })
}
// 获取服务类目信息
export function serviceCategory() {
  return request({
    url: API + '/gatewaymanagement/getServiceCategoryInformation',
    method: 'get'
  })
}

//  编辑专家 修改账号信息ByID
export function unitEdit(query) {
  return request({
    url: API + '/backstagemanagement/editBackstageSystemUserInformationById',
    method: 'post',
    data: query
  })
}
