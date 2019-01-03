/* eslint-disable */
/*
 * @Author: mikey.yiqiaohua
 * @Date: 2018-11-19 11:50:14
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-30 17:01:27
 */
import request from './define.js'

const API = '/Sz_dxyq' // 后台项目名
const uploadFile = `${API}/fileAction/uploadFile`
const imageUpload = `${API}/person/imageUpload`
const downloadFile = `${API}/fileAction/downloadFile`

export {
  uploadFile,
  imageUpload,
  downloadFile
}
// POST - data
// GET - params
// 数据字典start-----------------
// 创新载体级别
export function CarrierLevel() {
  return request({
    url: API + '/utils/getCodeInfoByCode/CarrierLevel',
    method: 'get'
  })
}
// 创新载体类别
export function CategoryLevel() {
  return request({
    url: API + '/utils/getCodeInfoByCode/CategoryLevel',
    method: 'get'
  })
}
// 数据字典end-------------------






// 获取审核流配置审核模块
export function amodule() {
  return request({
    url: API + '/utils/getCodeInfoByCode/WORKFLOW',
    method: 'get'
  })
}
// 根据模块选择更新表格内容

export function queryWorkFlowDefineList(id) {
  return request({
    url: API + '/workFlow/queryWorkFlowDefineList/' + id,
    method: 'get'
  })
}
// 获取树形列表/workFlow/getAllDept
export function getAllDept() {
  return request({
    url: API + '/workFlow/getAllDept',
    method: 'get'
  })
}

// 根据树形部门选择的
export function getRoleList(id) {
  return request({
    url: API + '/workFlow/getRoleList?deptid=' + id,
    method: 'get'
  })
}
// 机构新增 /workFlow/addWorkFlowDefine
export function addWorkFlowDefine(query) {
  return request({
    url: API + '/workFlow/addWorkFlowDefine',
    method: 'post',
    data: query
  })
}
// 删除机构
export function deleteWorkFlowDefine(query) {
  return request({
    url: API + '/workFlow/deleteWorkFlowDefine',
    method: 'post',
    data: query
  })
}
// 获取平台列表
export function getPlatformAuditList() {
  return request({
    url: API + '/workFlow/getPlatformAuditList',
    method: 'get'
  })
}
// 获取免审机构列表
export function getUnitList(query) {
  return request({
    url: API + '/workFlow/getUnitList',
    method: 'get',
    params: query
  })
}
// 机构编辑
export function editWorkFlowDefine(query) {
  return request({
    url: API + '/workFlow/editWorkFlowDefine',
    method: 'post',
    data: query
  })
}
// 平台审核设置免审核机构
export function addPlatformUnAuditOrg(query) {
  return request({
    url: API + '/workFlow/addPlatformUnAuditOrg',
    method: 'post',
    data: query
  })
}

// 平台设置审核角色 /workFlow/addPlatformAuditRole

export function addPlatformAuditRole(query) {
  return request({
    url: API + '/workFlow/addPlatformAuditRole',
    method: 'post',
    data: query
  })
}
// 组织人员start------------------------------------

// 组织人员的树
export function getDeptTree(query) {
  return request({
    url: API + '/basicInfo/getDeptTree',
    method: 'get',
    params: query
  })
}
// 根据树选择的id 获取列表内容
export function queryUserInfoList(query) {
  return request({
    url: API + '/basicInfo/queryUserInfoList',
    method: 'get',
    params: query
  })
}
// 组织新增接口
export function addUserInfo(query) {
  return request({
    url: API + '/basicInfo/addUserInfo',
    method: 'post',
    data: query
  })
}
// 组织修改接口
export function editDept(query) {
  return request({
    url: API + '/basicInfo/editDept',
    method: 'post',
    data: query
  })
}
// 组织删除
export function deleteDept(query) {
  return request({
    url: API + '/basicInfo/deleteDept',
    method: 'post',
    data: query
  })
}


// 组织人员启用 禁用 删除 /basicInfo/openAndCloseUserinfo
export function openAndCloseUserinfo(query) {
  return request({
    url: API + '/basicInfo/openAndCloseUserinfo',
    method: 'post',
    data: query
  })
}
// 编辑 /basicInfo/editUserInfo
export function editUserInfo(query) {
  return request({
    url: API + '/basicInfo/editUserInfo',
    method: 'post',
    data: query
  })
}
// 头像图片
export function deleteFile(id) {
  return request({
    url: API + '/fileAction/deleteFile/' + id,
    method: 'get'
  })
}
export function getUserListByRoleid(id) {
  return request({
    url: API + '/basicInfo/getUserListByRoleid/' + id,
    method: 'get'
  })
}
// export function getRoleList(id) {
//   return request({
//     url: API + '//workFlow/getRoleList',
//     method: 'get'
//   })
// }
// /basicInfo/setUserRole 设置角色
export function setUserRole(query) {
  return request({
    url: API + '/basicInfo/setUserRole',
    method: 'post',
    data: query
  })
}
// 获取用户角色/getUserRole/{userid}  获取当前登录用户角色信息
export function getUserRole(id) {
  return request({
    url: API + '/basicInfo/getUserRole/' + id,
    method: 'get'
  })
}
// /basicInfo/addDept
// 组织人员部门树新增
export function addDept(query) {
  return request({
    url: API + '/basicInfo/addDept',
    method: 'post',
    data: query
  })
}
// 组织人员end-----------------------------------------



// 委托单start-----------------------------------------
export function getProtocolList(type) {
  return request({
    url: API + '/protocol/getProtocolList/' + type,
    method: 'get',
  })
}
// /protocol/addProtocol 新增
export function addProtocol(query) {
  return request({
    url: API + '/protocol/addProtocol',
    method: 'post',
    data: query
  })
}
// /protocol/updateProtocolStatus禁用 启用
export function updateProtocolStatus(query) {
  return request({
    url: API + '/protocol/updateProtocolStatus',
    method: 'post',
    data: query
  })
}

// 委托单end-------------------------------------------

// 角色权限管理平台start--------------------------------
export function getRoleListByDept(query) {
  return request({
    url: API + '/basicInfo/getRoleListByDept/' + query,
    method: 'get',
  })
}
// /basicInfo/addRole/POST 新增角色
export function addRole(query) {
  return request({
    url: API + '/basicInfo/addRole',
    method: 'post',
    data: query
  })
}
export function editRole(query) {
  return request({
    url: API + '/basicInfo/editRole',
    method: 'post',
    data: query
  })
}
// /basicInfo/deleteRole  POST  删除角色   参数：id
export function deleteRole(query) {
  return request({
    url: API + '/basicInfo/deleteRole',
    method: 'post',
    data: query
  })
}
// /basicInfo/getMenuListTree  GET  获取菜单列表树 
export function getMenuListTree(query) {
  return request({
    url: API + '/basicInfo/getMenuListTree',
    method: 'get',
    params: query
  })
}

// POST 角色关联菜单保存 参数： roleid: 角色id, menus: 菜单id， 多个按逗号隔开
export function releMenu(query) {
  return request({
    url: API + '/basicInfo/releMenu',
    method: 'post',
    data: query
  })
}

// 角色权限管理平台end----------------------------------
// 电子协议
export function getProtocolList2() {
  return request({
    url: API + '/serviceManagementMechanism/getProtocolList/2',
    method: 'get'
  })
}
// 委托单
export function getProtocolList3() {
  return request({
    url: API + '/serviceManagementMechanism/getProtocolList/3',
    method: 'get'

  })
}

// 资质管理start----------------
export function getQualificationsList(query) {
  return request({
    url: API + '/publicManagemen/getQualificationsList',
    method: 'get',
    params: query
  })
}
// 禁启用
export function enableShutdown(query) {
  return request({
    url: API + '/publicManagemen/enableShutdown',
    method: 'post',
    data: query
  })
}
export function addQualifications(query) {
  return request({
    url: API + '/publicManagemen/addQualifications',
    method: 'post',
    data: query
  })
}
// 资质管理end------------------
// 创新载体管理start---------------------
export function getInnovativeList(query) {
  return request({
    url: API + '/publicManagemen/getInnovativeList',
    method: 'get',
    params: query
  })
}
// 新增创新载体
export function addInnovativePlatform(query) {
  return request({
    url: API + '/publicManagemen/addInnovativePlatform',
    method: 'post',
    data: query
  })
}
export function editInnovativeById(query) {
  return request({
    url: API + '/publicManagemen/editInnovativeById',
    method: 'post',
    data: query
  })
}
export function deleteInnovativeById(query) {
  return request({
    url: API + '/publicManagemen/deleteInnovativeById',
    method: 'post',
    data: query
  })
}
// 创新载体管理end-----------------------



// 登陆接口
export function login(query) {
  return request({
    url: API + '/login/addlogin',
    method: 'post',
    data: query
  })
}
