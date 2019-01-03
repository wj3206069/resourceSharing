/*
 * @Author: mikey.yiqiaohua
 * @Date: 2018-11-19 11:50:14
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-12 20:21:03
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

// 获取科技内容管理列表
export function queryScienceInfoList(query) {
  return request({
    url: API + '/contentManage/queryScienceInfoList',
    method: 'get',
    params: query
  })
}
// 科技删除接口
export function delScienceInfo(query) {
  return request({
    url: API + '/contentManage/delScienceInfo',
    method: 'post',
    data: query
  })
}
// 科技资讯批量上下架/contentManage/pubScienceInfo
export function pubScienceInfo(query) {
  return request({
    url: API + '/contentManage/pubScienceInfo',
    method: 'post',
    data: query
  })
}

// 科技置顶
export function topScienceInfo(query) {
  return request({
    url: API + '/contentManage/topScienceInfo',
    method: 'post',
    data: query
  })
}

// 科技新增

export function addScienceInfo(query) {
  return request({
    url: API + '/contentManage/addScienceInfo',
    method: 'post',
    data: query
  })
}
// 科技编辑
export function editScienceInfo(query) {
  return request({
    url: API + '/contentManage/editScienceInfo',
    method: 'post',
    data: query
  })
}

// 查询通知公告
export function queryNotificationList(query) {
  return request({
    url: API + '/contentManage/queryNotificationList',
    method: 'get',
    params: query
  })
}
// 置顶通知公告
export function topNotification(query) {
  return request({
    url: API + '/contentManage/topNotification',
    method: 'post',
    data: query
  })
}

// 上下架
export function pubNotification(query) {
  return request({
    url: API + '/contentManage/pubNotification',
    method: 'post',
    data: query
  })
}
// 新增通知公告
export function addNotification(query) {
  return request({
    url: API + '/contentManage/addNotification',
    method: 'post',
    data: query
  })
}
// 修改通知公告
export function editNotification(query) {
  return request({
    url: API + '/contentManage/editNotification',
    method: 'post',
    data: query
  })
}
// 删除与批量删除通知公告
export function delNotification(query) {
  return request({
    url: API + '/contentManage/delNotification',
    method: 'post',
    data: query
  })
}

// 登陆接口
export function login(query) {
  return request({
    url: API + '/login/addlogin',
    method: 'post',
    data: query
  })
}
